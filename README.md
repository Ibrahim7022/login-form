# Login App — Multi-Step Registration Flow

A pixel-faithful implementation of the Figma **Assignment Screens • Login flow** design, built with React, TypeScript, Redux Toolkit, Tailwind CSS, and SCSS modules.

## Live Demo

> Deploy with Vercel or Netlify (see [Deployment](#deployment) below). After deploying, add your live URL here.

## Repository

https://github.com/Ibrahim7022/login-form

## Screens

| Step | Screen | Features |
|------|--------|----------|
| 1 | Account type | Personal / Business selectable cards, hover & focus states |
| 2 | Mobile number | Country code selector, 10-digit validation |
| 3 | OTP entry | 4-digit inputs with auto-focus, paste support, resend countdown |
| 4 | Name | First & last name with required validation |
| 5 | Password | Show/hide toggle, min length & match validation |
| 6 | Success modal | Account summary, animated overlay |

**Demo OTP:** `8642`

## Tech Stack

- **React 19** + **TypeScript**
- **Redux Toolkit** — centralized registration state
- **Tailwind CSS** — layout utilities & design tokens
- **SCSS Modules** — component-scoped styles (buttons, inputs, cards)
- **Framer Motion** — step transitions & success modal animation

## Architecture

Feature-based folder structure:

```
src/
├── features/auth/
│   ├── components/     # Step-specific UI (AccountTypeStep, OtpStep, …)
│   ├── hooks/          # useRegistrationFlow — validation & navigation
│   ├── pages/          # RegistrationPage
│   ├── store/          # registrationSlice
│   └── types/
├── shared/
│   ├── components/     # Button, StepCard, PhoneInput, OtpInput, Modal, …
│   ├── hooks/          # Typed Redux hooks
│   └── utils/          # validation helpers
└── store/              # Redux store configuration
```

### Design decisions

1. **Redux for form state** — Keeps step data available for the success summary and supports predictable navigation without prop drilling.
2. **SCSS modules + Tailwind** — SCSS handles interactive component states (hover, focus, error); Tailwind handles page layout and typography scale.
3. **Simulated API delays** — `Continue` shows a loading spinner (~800ms) to demonstrate async UX before advancing or showing the success modal.
4. **Accessible OTP inputs** — Numeric `inputMode`, `aria-label` per digit, keyboard backspace navigation, and paste support.
5. **Resend cooldown** — 59-second timer before OTP resend is enabled again.

### Interaction states

- Buttons: hover shadow, active scale, disabled opacity, loading spinner
- Inputs: hover border, focus ring, error border + message
- Selectable cards: hover background, selected blue border + checkmark
- Progress bar: animated width transition between steps

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # Production build
npm run preview  # Preview production build
```

## Deployment

### Vercel (recommended)

```bash
npx vercel --prod
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) — framework preset: **Vite**, build command: `npm run build`, output directory: `dist`.

### Netlify

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## Testing the Flow

1. Select **Personal** or **Business** → Continue
2. Enter a 10-digit mobile number → Continue
3. Enter OTP `8642` → Continue
4. Fill first and last name → Continue
5. Password min 6 chars, confirm must match → Continue
6. Review summary in modal → **Go To Dashboard**

## License

MIT
