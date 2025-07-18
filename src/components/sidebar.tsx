export const Sidebar = () => {
  return (
    <aside className="w-64  p-4  ">
      <nav className="space-y-4 ">
        <a
          href="#"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <span>🏠</span> Home
        </a>
        <a
          href="#"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <span>📥</span> Inbox
        </a>
        <a
          href="#"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <span>📅</span> Calendar
        </a>
        <a
          href="#"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <span>🔍</span> Search
        </a>
        <a
          href="#"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <span>⚙️</span> Settings
        </a>
      </nav>
    </aside>
  );
};
