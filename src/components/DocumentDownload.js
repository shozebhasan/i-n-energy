/*
  A download button for one of the documents attached to a product — the
  datasheet or the product manual.

  It is a plain anchor rather than next/link because the file is served
  straight out of /public and is not an internal route. `download` asks the
  browser to save the file instead of opening a PDF viewer in the tab.
*/
export default function DocumentDownload({ href, label }) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center justify-center gap-2.5 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink"
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M8 1v9m0 0L4.5 6.5M8 10l3.5-3.5" />
        <path d="M2 11.5v2A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5v-2" />
      </svg>
      {label}
      <span className="text-xs font-normal text-muted">PDF</span>
    </a>
  );
}
