// src/components/Toolbar.tsx
import { type Component, createSignal } from "solid-js";

const ResponsiveToolbar: Component = () => {
  const [open, setOpen] = createSignal(false);

  return (
      
    <header class="fixed top-0 left-0 right-0 bg-blue-600 text-white shadow-md z-50">
      <nav class="flex items-center justify-between px-6 py-4">
        {/* Logo / App Name */}
        <h1 class="text-xl font-bold">My Enterprise App</h1>

        {/* Desktop Navigation */}
        <ul class="hidden md:flex gap-6">
          <li class="hover:underline cursor-pointer">Home</li>
          <li class="hover:underline cursor-pointer">About</li>
          <li class="hover:underline cursor-pointer">Contact</li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          class="md:hidden p-2 rounded hover:bg-blue-500"
          onClick={() => setOpen(!open())}
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open() && (
        <ul class="md:hidden bg-blue-700 px-6 py-4 space-y-2">
          <li class="hover:underline cursor-pointer">Home</li>
          <li class="hover:underline cursor-pointer">About</li>
          <li class="hover:underline cursor-pointer">Contact</li>
        </ul>
      )}
    </header>
  );
};

export default ResponsiveToolbar;
