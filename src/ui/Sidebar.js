import Link from 'next/link';
import menu from '@/data/menu.json';

function Sidebar(){
  return (
    <aside className="bg-base-200 w-64 h-[calc(100vh_-_44px)] p-4 sticky top-11">
      <Link href={'/components'}>
        <h2 className="text-lg font-semibold mb-4">Components</h2>
      </Link>
      <nav>
        <ul className="space-y-2">
          {menu.map((component) => (
            <li key={component.name}>
              <Link
                href={`${component.link}`}
                className="block p-2 rounded hover:bg-base-100 transition-colors duration-200"
              >
                {component.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

