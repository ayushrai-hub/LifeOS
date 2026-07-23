import { Shield, Bell, User } from 'lucide-react';

interface HeaderProps {
  showUserMenu?: boolean;
  showNotifications?: boolean;
}

export default function Header({ showUserMenu = false, showNotifications = false }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-semibold text-gray-900">TruthPrice</span>
        </div>

        {(showUserMenu || showNotifications) && (
          <div className="flex items-center gap-4">
            {showNotifications && (
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            )}
            {showUserMenu && (
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center hover:shadow-lg transition-shadow">
                <User className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
