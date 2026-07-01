import React from 'react'
import { useUser, useClerk } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/ai', label: 'Dashboard', icon: House },
  { to: '/ai/write-article', label: 'Write Article', icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', icon: FileText },
  { to: '/ai/community', label: 'Community', icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();   

  return (
    <div
      className={`
        w-60  bg-white border-r border-gray-200 flex flex-col  items-center
        max-sm:absolute top-14 bottom-0 
        ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} 
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="w-full my-7 ">
        <img 
          src={user?.imageUrl} 
          alt="user avatar" 
          className="w-13 rounded-full mx-auto " 
        />
        <h1 className="mt-1 text-center">{user?.fullName}</h1>
      </div>

      <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/ai'}
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              `px-3.5 py-2.5 flex items-center gap-3 rounded transition ${
                isActive
                  ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
      <div className="mt-auto w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
          <img 
            src={user?.imageUrl} 
            alt="user avatar" 
            className="w-8 rounded-full"  
          />
          <div>
            <h1 className="text-sm font-medium">{user?.fullName}</h1>
            <p className="text-xs  text-gray-500">
              <protect plan="premium" fallback = "Free">Premium</protect>{" "}
               plan
            </p>
          </div>

        </div>
        <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'/>

      </div>
    </div>
  )
}

export default Sidebar
