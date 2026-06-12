# UPSIDE DOWN AVIATION — STUDENT PORTAL v1
## Complete Product Specification
**Principal Product Architect · Next.js 15 · Supabase · Google OAuth · Google Calendar · Tailwind · Vercel**

> Not an LMS, not a course marketplace. A private, invite-only operations portal for *enrolled* students. Built so flying-school operations (flight hours, instructors, certifications) bolt on later **without a rewrite**.

---

## 1. PRODUCT ARCHITECTURE

### 1.1 System shape
```
                         ┌──────────────────────────────┐
  Public site (built) ──▶│  /portal  (student app)      │
                         │  /admin   (admin app)        │
                         └──────────────┬───────────────┘
                                        │  Next.js 15 App Router (RSC + server actions)
              ┌─────────────────────────┼─────────────────────────┐
              ▼                         ▼                          ▼
        Supabase Auth            Supabase Postgres           Supabase Storage
       (Google provider)        (RLS on every table)      (avatars, attachments)
              │                         │                          │
              └──────── Edge Functions / Route Handlers ───────────┘
                                        │
                          Google Calendar API (server-side, per-user tokens)
```

### 1.2 Architectural principles (future-proofing)
- **Modular domains.** Each capability (scheduling, attendance, progress, announcements) is its own service + table group with no hard cross-coupling. Adding `flight_logs` or `certifications` later = new tables + new module, no migration of existing logic.
- **Role-driven, not page-driven.** Access is computed from `role` + `status` + RLS, so new roles (Instructor, Examiner) slot in by adding enum values + policies.
- **Polymorphic "entity" patterns** for attachments, audit logs, and notifications so any future object can reuse them.
- **Append-only audit** from day one — required for an institution and for later ERP/compliance.
- **Server-first.** Sensitive logic (calendar tokens, attendance writes, role checks) lives in server actions / route handlers; the client never holds privileged logic.

### 1.3 Tech responsibilities
| Layer | Tool | Role |
|---|---|---|
| App / routing | Next.js 15 App Router | RSC pages, server actions, route handlers |
| Auth | Supabase Auth + Google OAuth | Sign-in, sessions, JWT with role claim |
| Data | Supabase Postgres + RLS | Source of truth, per-row authorization |
| Files | Supabase Storage | Avatars, announcement attachments, resources |
| Calendar | Google Calendar API | Per-student class sync |
| Async/jobs | Supabase Edge Functions / cron | Calendar re-sync, digest emails, reminders |
| Hosting | Vercel | App + serverless; Supabase managed separately |

---

## 2. AUTHENTICATION & RBAC

### 2.1 Rules
- **No self-registration.** Admin creates the student record (pre-authorized email).
- **Invitation email** sent on creation (Supabase invite or transactional email with a deep link to `/portal`).
- **Google sign-in only** — no passwords stored anywhere.
- **Allow-list gate:** on first sign-in, the authenticated Google email must match an `approved` profile row, else the user lands on a **"Pending / Not authorized"** screen with zero data access.

### 2.2 Roles (RBAC)
| Role | Scope | Can do |
|---|---|---|
| **Super Admin** | Whole org | Everything + manage Admins, settings, programs, audit, destructive ops |
| **Admin** | Assigned batches/programs | Create students, classes, attendance, announcements, update progress; no Super-Admin settings |
| **Student** | Self only | View own dashboard, schedule, attendance, progress, announcements; sync calendar; edit limited profile fields |

**Future roles** (designed-for, not built in v1): Instructor (own classes + attendance), Examiner (exam records), Placement Officer. Added via enum + RLS, no schema rewrite.

### 2.3 Permission model
- Role stored on `profiles.role`; mirrored into the JWT via a Supabase **custom access-token hook** so RLS and middleware can read it without an extra query.
- **Capability matrix** (server-enforced), e.g. `class.create = [super_admin, admin]`, `attendance.mark = [super_admin, admin, (future) instructor]`, `progress.update = [super_admin, admin]`.
- Next.js **middleware** guards `/portal/*` (any approved authenticated user) and `/admin/*` (admin/super_admin only); RLS is the real backstop.

### 2.4 Auth flow (happy path)
```
Admin creates student (email, program, batch) → status=invited → invite email sent
Student clicks link → Google OAuth consent (incl. Calendar scope) → Supabase session
→ server checks profile by email: approved? → status=active → /portal/dashboard
                                   not found / not approved? → /portal/pending
```

---

## 3. USER FLOWS

### 3.1 Student
1. **Onboarding:** invite email → Google sign-in → consent → first-run profile confirm (photo, phone) → dashboard.
2. **Daily:** open dashboard → see Next Class + unread announcements → tap **Join** at class time.
3. **Calendar:** open a class → **Add to Google Calendar** (one tap) → event appears; later admin edits auto-update it.
4. **Attendance:** view history + percentage; read-only.
5. **Progress:** see the 5-stage aviation journey with status per stage.
6. **Announcements:** notification center, unread badges, open detail, download attachment.
7. **Profile:** view/edit limited fields (photo, phone); see program/batch/enrollment (read-only).

### 3.2 Auth edge flows
- Email not in allow-list → Pending screen + "contact admin."
- Calendar consent declined → portal works; "Add to Calendar" falls back to a downloadable `.ics`.
- Suspended student → blocked at middleware + RLS; sees "account inactive."

---

## 4. SCREEN INVENTORY

### Student (`/portal`)
| Screen | Key elements |
|---|---|
| `/portal/dashboard` | Welcome, Next Class, Upcoming (3), Attendance %, Progress, Announcements, Quick Actions |
| `/portal/schedule` | Full calendar/list, filters, Join, Add-to-Calendar |
| `/portal/class/[id]` | Class detail, instructor, meeting link, calendar action |
| `/portal/attendance` | History table, percentage, per-subject breakdown |
| `/portal/progress` | 5-stage journey tracker with statuses + notes |
| `/portal/announcements` | List + unread; `/announcements/[id]` detail |
| `/portal/profile` | Profile view/edit |
| `/portal/pending` | Not-authorized / inactive state |

### Admin (`/admin`)
Dashboard · Students (list/detail/create) · Classes (list/create/edit) · Attendance (mark/bulk) · Announcements (list/create) · Programs (& batches) · Analytics · Settings · Audit Log.

---

## 5. STUDENT DASHBOARD — UI LAYOUT

**Mobile-first single column; desktop = 12-col, 2/3 main + 1/3 rail.**

```
┌─────────────────────────────────────────────┐
│ Top bar: logo · greeting · avatar · 🔔(badge) │
├───────────────────────────┬─────────────────┤
│ WELCOME CARD              │ NEXT CLASS       │
│ "Good morning, Arjun"     │ Tech General     │
│ Program · Batch B-07      │ Today 18:00      │
│ Progress ▓▓▓▓░ 64%        │ Instr. Capt. R   │
│                           │ [Join] (live@T-10)│
├───────────────────────────┼─────────────────┤
│ UPCOMING CLASSES (3)      │ ATTENDANCE       │
│ • date·time·instr·[Join]  │ donut 92%        │
│ • …  • …                  │ Present 23 / Abs 2│
│ [View full schedule →]    │ [History →]      │
├───────────────────────────┼─────────────────┤
│ PROGRESS TRACKER          │ ANNOUNCEMENTS    │
│ Learning ✔ Training �)     │ • title · 2 new  │
│ Exam ○ Mentorship ○ …     │ [All →]          │
├───────────────────────────┴─────────────────┤
│ QUICK ACTIONS: Schedule · Mentor · Resources │
└─────────────────────────────────────────────┘
```

**Component sources:** Welcome (`profiles`+`progress` aggregate) · Next/Upcoming (`classes` joined to batch, time-filtered) · Attendance donut (`attendance` aggregate) · Progress (`progress`) · Announcements (`announcements`+read state) · Join button enabled within T-10min → T+class length.

---

## 6. CLASS MANAGEMENT

**Admin create class** → fields: Title, Subject, Instructor, Date, Time (+duration), Meeting Link, Mode (online/offline), Batch. On save: row in `classes`; students in that batch get a notification; if a student has calendar sync on, an event is created for each.

**Student:** View (detail), **Join** (opens meeting link, time-gated), **Add to Calendar** (one-click).

**Edit/cancel:** editing time/link triggers calendar re-sync for all linked events; cancel marks `status=cancelled` and updates/deletes events + notifies.

---

## 7. GOOGLE CALENDAR ARCHITECTURE

### 7.1 Approach
Server-side, per-user tokens (least privilege, scope `calendar.events`).
```
Student enables sync (once) → Google refresh_token stored encrypted (Supabase Vault)
Add-to-Calendar(classId) → server action → Calendar API insert
   → store {class_id, student_id, google_event_id} in calendar_events
Admin edits class → trigger/job loops calendar_events for that class
   → Calendar API patch each google_event_id (auto-reflects)
Class cancelled → Calendar API delete events
```
- **Fallback** (no consent): generate `.ics` / Google template URL — no token needed.
- **Idempotency:** unique `(class_id, student_id)` prevents duplicate events; upsert on re-sync.
- **Token failure** (revoked): mark sync disabled, prompt re-consent; never block the portal.

---

## 8. ATTENDANCE MODULE

**Admin:** mark per class — single or **bulk** (roster of the class's batch, default Present, toggle Absent/Excused, one save). Editable with audit trail.
**Student:** read-only history + dashboard %; per-subject breakdown.

**Percentage** = `present / (present + absent)` (excused excluded), computed in a view for dashboard speed.

---

## 9. ANNOUNCEMENTS MODULE

**Admin create:** Title, Description (rich text), Priority (normal/important/urgent), Attachment (Storage), Audience (global or batch), publish/schedule.
**Student:** list with **unread indicator**, notification center (🔔 badge), detail view, attachment download. Read state per student via `announcement_reads`.

---

## 10. PROGRESS TRACKING (data model concept)

Five canonical aviation stages: **Learning · Training · Examination · Mentorship · Career Readiness** (mirrors the public site's journey). Each student has one `progress` row per stage with `status (not_started | in_progress | completed)`, `percent`, `note`, `updated_by`, `updated_at`. Admin updates; student views. Dashboard `Progress %` = weighted average across stages. Extensible: add stages (e.g., "Flight Training") by inserting rows, no schema change.

---

## 11. STUDENT PROFILE (extensible)

Core (`profiles` / `student_details`): Photo, Name, Email, Phone, Batch, Program, Enrollment Date.
**Future fields** (added as nullable columns or a `student_details` JSONB without breaking v1): Medical Status, DGCA Exam records, Flight Hours, Certifications. Editable by student: photo, phone only.

---

## 12. ADMIN DASHBOARD

| Section | Purpose | Features | Actions | Permissions |
|---|---|---|---|---|
| **Dashboard** | At-a-glance ops | KPIs: active students, today's classes, avg attendance, pending tasks | Drill into any module | Admin+ |
| **Students** | Roster mgmt | List/search/filter, detail, create, invite, suspend | Create student, resend invite, approve, suspend, assign batch | Admin+ (create/suspend); Super for delete |
| **Attendance** | Records | Per-class roster, bulk mark, edit, export | Mark, bulk-mark, correct | Admin+ |
| **Classes** | Scheduling | Calendar/list, create/edit/cancel, recurring (future) | CRUD class, trigger re-sync | Admin+ |
| **Announcements** | Comms | Create, schedule, target audience, attachments | Publish, edit, delete | Admin+ |
| **Programs** | Curriculum | Programs + batches, stages config | CRUD program/batch | Super Admin |
| **Analytics** | Insight | Attendance trends, progress distribution, engagement | View/export | Admin+ |
| **Settings** | Config | Org info, roles, integrations, calendar | Manage admins, keys | Super Admin |
| **Audit Log** | Accountability | Immutable action history, filters | View/export | Super Admin |

---

## 13. DATABASE DESIGN (Supabase / Postgres)

> RLS enabled on every table; deny-by-default. `auth.uid()` ties rows to the signed-in user.

```sql
-- ENUMS
create type user_role   as enum ('super_admin','admin','student');
create type user_status as enum ('invited','active','suspended','pending');
create type class_mode  as enum ('online','offline');
create type class_status as enum ('scheduled','cancelled','completed');
create type attend_status as enum ('present','absent','excused');
create type progress_status as enum ('not_started','in_progress','completed');
create type priority as enum ('normal','important','urgent');

-- PROFILES (1:1 with auth.users; role + status live here)
create table profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text unique not null,
  full_name    text,
  avatar_url   text,
  phone        text,
  role         user_role   not null default 'student',
  status       user_status not null default 'invited',
  created_at   timestamptz default now()
);

-- PROGRAMS & BATCHES
create table programs (
  id uuid primary key default gen_random_uuid(),
  name text not null, description text,
  created_at timestamptz default now()
);
create table batches (
  id uuid primary key default gen_random_uuid(),
  program_id uuid references programs(id) on delete cascade,
  name text not null, start_date date, end_date date,
  created_at timestamptz default now()
);

-- ENROLLMENT + extensible student details
create table enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id) on delete cascade,
  program_id uuid references programs(id),
  batch_id   uuid references batches(id),
  enrolled_at date default now(),
  unique (student_id, batch_id)
);
create table student_details (              -- future-proof: nullable + JSONB
  student_id uuid primary key references profiles(id) on delete cascade,
  medical_status text, dgca_exams jsonb default '[]',
  flight_hours numeric default 0, extra jsonb default '{}'
);

-- CLASSES
create table classes (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid references batches(id) on delete cascade,
  title text not null, subject text, instructor text,
  starts_at timestamptz not null, ends_at timestamptz,
  mode class_mode default 'online', meeting_link text, location text,
  status class_status default 'scheduled',
  created_by uuid references profiles(id), created_at timestamptz default now()
);

-- ATTENDANCE
create table attendance (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references classes(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  status attend_status not null default 'present',
  marked_by uuid references profiles(id), marked_at timestamptz default now(),
  unique (class_id, student_id)
);

-- ANNOUNCEMENTS + per-student read state
create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null, body text, priority priority default 'normal',
  attachment_url text, batch_id uuid references batches(id),  -- null = global
  published_at timestamptz, author_id uuid references profiles(id),
  created_at timestamptz default now()
);
create table announcement_reads (
  announcement_id uuid references announcements(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  read_at timestamptz default now(),
  primary key (announcement_id, student_id)
);

-- PROGRESS (one row per student per stage)
create table progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id) on delete cascade,
  stage text not null,                         -- Learning, Training, ...
  status progress_status default 'not_started',
  percent int default 0, note text,
  updated_by uuid references profiles(id), updated_at timestamptz default now(),
  unique (student_id, stage)
);

-- CALENDAR EVENT LINKS
create table calendar_events (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references classes(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  google_event_id text, synced_at timestamptz default now(),
  unique (class_id, student_id)
);

-- NOTIFICATIONS (polymorphic, reusable)
create table notifications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id) on delete cascade,
  type text, payload jsonb, read_at timestamptz, created_at timestamptz default now()
);

-- AUDIT LOG (append-only)
create table audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references profiles(id),
  action text not null, entity text, entity_id uuid,
  diff jsonb, created_at timestamptz default now()
);
```
**Representative RLS:** student reads only rows where `student_id = auth.uid()` (or batch matches their enrollment for classes/announcements); all writes to `classes/attendance/announcements/progress` restricted to `role in ('admin','super_admin')`; `audit_logs` insert-only, readable by super_admin.

**Helper views:** `v_attendance_summary` (per student %), `v_student_dashboard` (joined snapshot) for fast RSC reads.

---

## 14. API DESIGN

> App Router: **server actions** for mutations, **route handlers** for OAuth/webhooks/cron, **RSC** for reads. Services encapsulate DB + external calls.

| Domain | Reads (RSC) | Mutations (server action) | Route handlers |
|---|---|---|---|
| **Auth** | session, profile | `acceptInvite`, `updateOwnProfile` | `/api/auth/callback` (OAuth), `/api/auth/calendar-consent` |
| **Classes** | `listClasses(batch, range)`, `getClass` | `createClass`, `updateClass`, `cancelClass` (admin) | — |
| **Attendance** | `getMyAttendance`, `getClassRoster` | `markAttendance`, `bulkMarkAttendance` (admin) | — |
| **Announcements** | `listAnnouncements`, `getAnnouncement` | `createAnnouncement`, `markRead` | — |
| **Progress** | `getMyProgress` | `updateProgress` (admin) | — |
| **Calendar** | `getSyncStatus` | `addClassToCalendar`, `disableSync` | `/api/cron/calendar-resync` |
| **Students** (admin) | `listStudents`, `getStudent` | `createStudent`(+invite), `suspendStudent`, `assignBatch` | — |

**Service layer:** `AuthService`, `ClassService`, `AttendanceService`, `AnnouncementService`, `ProgressService`, `CalendarService`, `AuditService` (every mutating service writes an audit row).

---

## 15. SECURITY DESIGN
- **Google OAuth only** — no password surface.
- **RBAC** via role claim + capability matrix, server-enforced.
- **RLS** deny-by-default on every table (the true authorization boundary).
- **Audit logs** append-only on all mutations; super-admin visible.
- **Rate limiting** on auth callbacks, invite resends, and admin bulk actions (Vercel middleware / Upstash).
- **Token security:** Google refresh tokens encrypted at rest (Vault); server-only use; revocable; minimal scope.
- **DPDP Act 2023:** explicit consent at first sign-in; data export & delete on request; documented retention; student data access limited to the student + assigned admins; minors → guardian consent field.
- **Storage:** signed URLs for attachments/avatars; bucket policies by role.

---

## 16. MOBILE EXPERIENCE (mobile-first)
- Students live on phones → **design phone-first, enhance for desktop.**
- **Bottom tab bar:** Home · Schedule · Attendance · Alerts · Profile.
- **Dashboard** stacks to one column; Next Class is the hero card; **Join** is a thumb-zone full-width button.
- **Schedule** = day/list view, swipe between days; Add-to-Calendar inline.
- **Announcements** = feed with unread dots; pull-to-refresh.
- Large tap targets (≥44px), sticky Join CTA at class time, offline-tolerant reads (cache last dashboard), PWA-installable (add-to-home) as a near-app experience.

---

## 17. FUTURE EXPANSION PLAN
| Ver | Adds | New tables/modules (no rewrite) |
|---|---|---|
| **v1** | Schedule, attendance, announcements, progress, calendar, profile | (this doc) |
| **V2** | Placement portal, mock interviews, resource library, tests | `resources`, `tests`, `test_attempts`, `placements`, `interviews` |
| **V3** | Flying school ops | `aircraft`, `flight_logs`, `instructors` (role), `flight_schedules`, `certifications`, `exam_records` |
| **V4** | Full Aviation ERP | billing, maintenance, compliance, multi-branch — all extend the same role+RLS+audit spine |

**Why it won't need a rebuild:** modular domains, role-by-enum RBAC, RLS per table, polymorphic notifications/attachments/audit, and `student_details.extra` JSONB for fast-moving fields mean every future module is *additive*.

---

*End of Student Portal v1 specification. No code — implementation-ready blueprint. Build order recommendation: Auth+RBAC → Profile/Programs/Batches → Classes+Schedule → Attendance → Announcements → Progress → Calendar sync → Admin analytics.*
