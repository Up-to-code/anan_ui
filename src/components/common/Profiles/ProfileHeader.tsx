'use client';

interface ProfileHeaderProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
    coverImage?: string;
    stats?: {
      posts: number;
      followers: number;
      following: number;
    };
  };
  onEditProfile?: () => void;
  onFollow?: () => void;
  isFollowing?: boolean;
}

export default function ProfileHeader({
  user,
  onEditProfile,
  onFollow,
  isFollowing = false
}: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 relative">
        {user.coverImage ? (
          <img 
            src={user.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-600" />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        
        {/* Avatar and Basic Info */}
        <div className="flex items-end gap-6 -mt-12 mb-4">
          
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-4 border-white flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0)}
          </div>

          {/* Actions */}
          <div className="flex-1 flex justify-end gap-3 mb-2">
            <button
              onClick={onEditProfile}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              تعديل الملف
            </button>
            {onFollow && (
              <button
                onClick={onFollow}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isFollowing 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isFollowing ? 'متابع' : 'متابعة'}
              </button>
            )}
          </div>

        </div>

        {/* User Details */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600">{user.role}</p>
        </div>

        {/* Stats */}
        {user.stats && (
          <div className="flex gap-6 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{user.stats.posts}</div>
              <div className="text-gray-600 text-sm">المشاركات</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{user.stats.followers}</div>
              <div className="text-gray-600 text-sm">المتابعون</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{user.stats.following}</div>
              <div className="text-gray-600 text-sm">يتابع</div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}