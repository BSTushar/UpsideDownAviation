import { test, expect, type Page, type APIRequestContext } from "@playwright/test";

const PUBLIC_ROUTES = [
  "/",
  "/enquire",
  "/privacy",
  "/terms",
  "/portal/login",
  "/robots.txt",
  "/sitemap.xml",
] as const;

const PORTAL_ROUTES = [
  "/portal/dashboard",
  "/portal/schedule",
  "/portal/announcements",
  "/portal/profile",
  "/portal/journey",
  "/portal/attendance",
  "/portal/progress",
  "/portal/mentorship",
] as const;

const ADMIN_ROUTES = [
  "/admin",
  "/admin/students",
  "/admin/programs",
  "/admin/batches",
  "/admin/classes",
  "/admin/attendance",
  "/admin/announcements",
  "/admin/analytics",
  "/admin/settings",
] as const;

const STATIC_ASSETS = [
  "/intro/window-intro.js",
  "/logo-full.png",
  "/favicon.ico",
  "/site.webmanifest",
] as const;

/** Skip cabin intro + mark session so page content is testable. */
async function skipIntro(page: Page) {
  await page.addInitScript(() => {
    sessionStorage.setItem("aw-intro-played", "1");
    document.documentElement?.classList.remove("aw-intro-pending");
  });
}

/** Start portal preview session in storage before navigation. */
async function seedPortalSession(page: Page, name = "Test Pilot") {
  await page.addInitScript(
    ([key, nameKey, nameVal]) => {
      sessionStorage.setItem(key, "1");
      sessionStorage.setItem(nameKey, nameVal);
      sessionStorage.setItem("aw-intro-played", "1");
      document.documentElement?.classList.remove("aw-intro-pending");
    },
    ["uda-portal-demo", "uda-portal-preview-name", name] as const
  );
}

function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const text = msg.text();
      if (text.includes("favicon")) return;
      if (text.includes("404") && text.includes("image")) return;
      errors.push(`console: ${text}`);
    }
  });
  return errors;
}

test.describe("HTTP stress — all routes", () => {
  test("public routes return 200", async ({ request }) => {
    for (const route of PUBLIC_ROUTES) {
      const res = await request.get(route);
      expect(res.status(), `${route} should be 200`).toBe(200);
    }
  });

  test("admin routes return 200", async ({ request }) => {
    for (const route of ADMIN_ROUTES) {
      const res = await request.get(route);
      expect(res.status(), `${route} should be 200`).toBe(200);
    }
  });

  test("static assets return 200", async ({ request }) => {
    for (const asset of STATIC_ASSETS) {
      const res = await request.get(asset);
      expect(res.status(), `${asset} should be 200`).toBe(200);
    }
  });

  test("parallel burst — home page 20x", async ({ request }) => {
    const results = await Promise.all(
      Array.from({ length: 20 }, () => request.get("/"))
    );
    for (const res of results) {
      expect(res.status()).toBe(200);
    }
  });

  test("inquiry API accepts valid payload", async ({ request }) => {
    const res = await postInquiry(request, validInquiry());
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  test("inquiry API rejects invalid payload", async ({ request }) => {
    const res = await request.post("/api/inquiry", {
      data: { name: "x" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(400);
  });

  test("inquiry API honeypot silently succeeds", async ({ request }) => {
    const res = await postInquiry(request, { ...validInquiry(), company: "bot" });
    expect(res.status()).toBe(200);
  });
});

test.describe("Marketing site", () => {
  test("home loads with hero and footer", async ({ page }) => {
    await skipIntro(page);
    const errors = collectPageErrors(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Train for your aviation career/i })).toBeVisible();
    await expect(page.locator("footer").getByText("Bengaluru", { exact: true })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Explore" })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("nav anchor links resolve to sections", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/");
    await page.setViewportSize({ width: 1280, height: 900 });

    const anchors = [
      { link: "Programs", id: "programs" },
      { link: "Journey", id: "journey" },
      { link: "About", id: "why" },
      { link: "Vision", id: "vision" },
    ];

    for (const { link, id } of anchors) {
      await page.getByRole("link", { name: link, exact: true }).first().click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test("enquire form submits successfully", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/enquire");
    await page.getByLabel("Full name").fill("Arjun Singh");
    await page.getByLabel("Phone number").fill("+91 9876543210");
    await page.getByLabel("Email address").fill("arjun@example.com");
    await page.getByLabel("Area of interest").selectOption("Ground Training");
    await page.getByLabel(/I agree to be contacted/i).check();
    await page.getByRole("button", { name: "Request advisory call" }).click();
    await expect(page.getByText(/Thank you/i)).toBeVisible({ timeout: 20_000 });
  });

  test("privacy and terms pages load", async ({ page }) => {
    await skipIntro(page);
    for (const route of ["/privacy", "/terms"]) {
      await page.goto(route);
      await expect(page.getByRole("heading").first()).toBeVisible();
    }
  });

  test("footer links work", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.getByRole("link", { name: "Privacy Policy" }).click();
    await expect(page).toHaveURL(/\/privacy/);
  });
});

test.describe("Portal flows", () => {
  test("unauthenticated dashboard redirects to login", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/portal/dashboard");
    await expect(page).toHaveURL(/\/portal\/login/);
  });

  test("preview login → dashboard → sign out", async ({ page }) => {
    await skipIntro(page);
    const errors = collectPageErrors(page);
    await page.goto("/portal/login");
    await page.getByRole("button", { name: /View the experience/i }).click();
    await page.getByLabel("Your first name").fill("Arjun");
    await page.getByRole("button", { name: /Continue to preview/i }).click();
    await expect(page).toHaveURL(/\/portal\/dashboard/, { timeout: 20_000 });
    await expect(page.getByText(/Welcome, Arjun/i)).toBeVisible({ timeout: 15_000 });

    await page.getByRole("button", { name: /Sign out/i }).click();
    await expect(page).toHaveURL(/\/portal\/login/, { timeout: 20_000 });
    expect(errors).toEqual([]);
  });

  test("all portal pages load with session", async ({ page }) => {
    await seedPortalSession(page);
    for (const route of PORTAL_ROUTES) {
      const errors = collectPageErrors(page);
      await page.goto(route);
      await expect(page.locator("body")).not.toContainText("Application error");
      await expect(page.locator("body")).not.toContainText("Internal Server Error");
      expect(errors, `${route} console errors`).toEqual([]);
    }
  });

  test("student portal nav from header shows loader", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/");
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.getByRole("link", { name: "Student Portal" }).first().click();
    await expect(page.getByLabel(/Loading Upside Down Aviation/i)).toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL(/\/portal\/login/, { timeout: 20_000 });
  });
});

test.describe("Admin", () => {
  test("all admin pages load", async ({ page }) => {
    await skipIntro(page);
    for (const route of ADMIN_ROUTES) {
      const errors = collectPageErrors(page);
      await page.goto(route);
      await expect(page.locator("body")).not.toContainText("Internal Server Error");
      expect(errors, `${route} console errors`).toEqual([]);
    }
  });
});

test.describe("Window intro safety", () => {
  test("intro pending cover clears and does not block forever", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.removeItem("aw-intro-played");
    });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Train for your aviation career/i })).toBeVisible({
      timeout: 20_000,
    });
    await expect
      .poll(
        () =>
          page.evaluate(() => !document.documentElement.classList.contains("aw-intro-pending")),
        { timeout: 15_000 }
      )
      .toBe(true);
  });

  test("intro canvas renders visible window (not black screen)", async ({ page }) => {
    await page.addInitScript(() => sessionStorage.removeItem("aw-intro-played"));
    await page.goto("/");
    await page.waitForTimeout(1200);
    const stats = await page.evaluate(() => {
      const intro = document.querySelector(".aw-intro");
      const cv = document.querySelector(".aw-intro__cv") as HTMLCanvasElement | null;
      if (!intro || !cv) return { ok: false, reason: "missing overlay" };
      if (intro.parentElement?.tagName !== "HTML") return { ok: false, reason: "wrong mount" };
      const ctx = cv.getContext("2d");
      if (!ctx) return { ok: false, reason: "no ctx" };
      const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
      let bright = 0;
      for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 80) bright++;
      const pct = bright / (cv.width * cv.height);
      return { ok: pct > 0.05, pct, parent: intro.parentElement?.tagName };
    });
    expect(stats.ok, JSON.stringify(stats)).toBe(true);
  });
});

function validInquiry() {
  return {
    name: "Stress Test",
    phone: "+91 9876543210",
    email: "stress@example.com",
    interest: "General",
    consent: true,
  };
}

async function postInquiry(request: APIRequestContext, data: object) {
  return request.post("/api/inquiry", {
    data,
    headers: { "Content-Type": "application/json" },
  });
}
