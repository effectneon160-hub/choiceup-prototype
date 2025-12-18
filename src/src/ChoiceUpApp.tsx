import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeIcon, PlusCircleIcon, UsersIcon, MessageCircleIcon, UserIcon, HeartIcon, MessageSquareIcon, ShareIcon, BellIcon, SearchIcon, TrophyIcon, ZapIcon, CheckCircleIcon, XIcon, SendIcon, ImageIcon, SettingsIcon, LogOutIcon, TrendingUpIcon, StarIcon, SmileIcon, ThumbsUpIcon, FilterIcon, ClockIcon, BarChart3Icon, TargetIcon, LinkIcon, MoreHorizontalIcon } from 'lucide-react';
// Types
interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  xp: number;
  points: number;
  level: number;
  achievements: string[];
}
interface PollOption {
  id: string;
  text: string;
  image?: string;
  votes: number;
}
interface Poll {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  description: string;
  options: PollOption[];
  totalVotes: number;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
  userVote?: string;
}
interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline';
  lastActive: string;
  recentActivity?: string;
}
interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}
interface Notification {
  id: string;
  type: 'vote' | 'comment' | 'achievement' | 'friend';
  user?: string;
  avatar?: string;
  message: string;
  timestamp: string;
  read: boolean;
}
interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
}
interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}
interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  icon: string;
}
// Mock Data
const initialUser: User = {
  id: '1',
  username: 'you',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
  bio: 'Decision maker extraordinaire 🎯',
  xp: 2450,
  points: 890,
  level: 12,
  achievements: ['first_vote', 'poll_master', 'social_butterfly', 'trendsetter']
};
const initialPolls: Poll[] = [{
  id: '1',
  user: {
    username: 'sarah_styles',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  description: 'Which outfit should I wear to the party tonight? 🎉',
  options: [{
    id: 'a',
    text: 'Black Dress',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
    votes: 234
  }, {
    id: 'b',
    text: 'Red Jumpsuit',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=1000&fit=crop',
    votes: 189
  }],
  totalVotes: 423,
  timestamp: '2h ago',
  likes: 156,
  comments: 42,
  tags: ['fashion', 'style', 'party']
}, {
  id: '2',
  user: {
    username: 'mike_travels',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  description: 'Next vacation destination? Help me decide! ✈️',
  options: [{
    id: 'a',
    text: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=1000&fit=crop',
    votes: 567
  }, {
    id: 'b',
    text: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=1000&fit=crop',
    votes: 823
  }],
  totalVotes: 1390,
  timestamp: '5h ago',
  likes: 421,
  comments: 98,
  tags: ['travel', 'vacation', 'adventure']
}, {
  id: '3',
  user: {
    username: 'emma_foodie',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  },
  description: "Dinner tonight? I can't decide! 🍽️",
  options: [{
    id: 'a',
    text: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=1000&fit=crop',
    votes: 312
  }, {
    id: 'b',
    text: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=1000&fit=crop',
    votes: 445
  }],
  totalVotes: 757,
  timestamp: '8h ago',
  likes: 289,
  comments: 67,
  tags: ['food', 'dinner', 'yum']
}, {
  id: '4',
  user: {
    username: 'alex_fitness',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
  },
  description: 'Morning workout routine? 💪',
  options: [{
    id: 'a',
    text: 'Gym Session',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=1000&fit=crop',
    votes: 198
  }, {
    id: 'b',
    text: 'Yoga & Meditation',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=1000&fit=crop',
    votes: 276
  }],
  totalVotes: 474,
  timestamp: '12h ago',
  likes: 167,
  comments: 34,
  tags: ['fitness', 'health', 'workout']
}, {
  id: '5',
  user: {
    username: 'lisa_decor',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop'
  },
  description: 'Living room makeover - which vibe? 🏠',
  options: [{
    id: 'a',
    text: 'Modern Minimalist',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1000&fit=crop',
    votes: 389
  }, {
    id: 'b',
    text: 'Cozy Bohemian',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1000&fit=crop',
    votes: 412
  }],
  totalVotes: 801,
  timestamp: '1d ago',
  likes: 334,
  comments: 89,
  tags: ['homedecor', 'interior', 'design']
}, {
  id: '6',
  user: {
    username: 'david_tech',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'
  },
  description: 'New phone upgrade? 📱',
  options: [{
    id: 'a',
    text: 'iPhone 15 Pro',
    image: 'https://images.unsplash.com/photo-1592286927505-b0e6d8c3b6d4?w=800&h=1000&fit=crop',
    votes: 523
  }, {
    id: 'b',
    text: 'Samsung Galaxy S24',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=1000&fit=crop',
    votes: 467
  }],
  totalVotes: 990,
  timestamp: '1d ago',
  likes: 412,
  comments: 156,
  tags: ['tech', 'smartphone', 'gadgets']
}, {
  id: '7',
  user: {
    username: 'nina_books',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop'
  },
  description: 'Weekend read? 📚',
  options: [{
    id: 'a',
    text: 'Mystery Thriller',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1000&fit=crop',
    votes: 234
  }, {
    id: 'b',
    text: 'Romance Novel',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1000&fit=crop',
    votes: 198
  }],
  totalVotes: 432,
  timestamp: '2d ago',
  likes: 178,
  comments: 45,
  tags: ['books', 'reading', 'weekend']
}];
const initialFriends: Friend[] = [{
  id: '1',
  username: 'sarah_styles',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  status: 'online',
  lastActive: 'Active now',
  recentActivity: 'Voted on your poll'
}, {
  id: '2',
  username: 'mike_travels',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  status: 'online',
  lastActive: 'Active now',
  recentActivity: 'Created a new poll'
}, {
  id: '3',
  username: 'emma_foodie',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  status: 'offline',
  lastActive: '2h ago',
  recentActivity: 'Commented on your poll'
}, {
  id: '4',
  username: 'alex_fitness',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  status: 'online',
  lastActive: 'Active now',
  recentActivity: 'Liked your poll'
}, {
  id: '5',
  username: 'lisa_decor',
  avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
  status: 'offline',
  lastActive: '5h ago',
  recentActivity: 'Shared your poll'
}, {
  id: '6',
  username: 'david_tech',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  status: 'online',
  lastActive: 'Active now',
  recentActivity: 'Started following you'
}];
const initialNotifications: Notification[] = [{
  id: '1',
  type: 'vote',
  user: 'sarah_styles',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  message: 'voted on your poll',
  timestamp: '5m ago',
  read: false
}, {
  id: '2',
  type: 'achievement',
  message: 'You unlocked "Poll Master" achievement! 🏆',
  timestamp: '1h ago',
  read: false
}, {
  id: '3',
  type: 'comment',
  user: 'mike_travels',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  message: 'commented: "Great choice!"',
  timestamp: '2h ago',
  read: true
}, {
  id: '4',
  type: 'friend',
  user: 'emma_foodie',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  message: 'started following you',
  timestamp: '3h ago',
  read: true
}];
export const ChoiceUpApp: React.FC<{
  'data-id'?: string;
}> = ({
  'data-id': dataId
}) => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'create' | 'friends' | 'chat' | 'profile' | 'notifications' | 'search' | 'leaderboard' | 'challenges'>('home');
  const [user, setUser] = useState<User>(initialUser);
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [friends] = useState<Friend[]>(initialFriends);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementText, setAchievementText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // New state for enhanced features
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [showShare, setShowShare] = useState<string | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'trending' | 'votes'>('recent');
  const [pollReactions, setPollReactions] = useState<Record<string, Reaction[]>>({
    '1': [{
      emoji: '❤️',
      count: 45,
      users: ['sarah_styles', 'mike_travels']
    }, {
      emoji: '🔥',
      count: 32,
      users: ['emma_foodie']
    }, {
      emoji: '👍',
      count: 28,
      users: ['alex_fitness']
    }]
  });
  const [pollComments, setPollComments] = useState<Record<string, Comment[]>>({
    '1': [{
      id: '1',
      user: 'sarah_styles',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      text: 'Love the black dress! So elegant 😍',
      timestamp: '1h ago',
      likes: 12
    }, {
      id: '2',
      user: 'mike_travels',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      text: 'Red jumpsuit is bold and fun!',
      timestamp: '45m ago',
      likes: 8
    }]
  });
  const dailyChallenges: DailyChallenge[] = [{
    id: '1',
    title: 'Vote Master',
    description: 'Vote on 5 polls today',
    reward: 50,
    progress: 3,
    total: 5,
    icon: '🎯'
  }, {
    id: '2',
    title: 'Social Butterfly',
    description: 'Comment on 3 different polls',
    reward: 30,
    progress: 1,
    total: 3,
    icon: '💬'
  }, {
    id: '3',
    title: 'Trendsetter',
    description: 'Create a poll that gets 100 votes',
    reward: 100,
    progress: 67,
    total: 100,
    icon: '⭐'
  }];
  const handleVote = (pollId: string, optionId: string) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId && !poll.userVote) {
        const updatedOptions = poll.options.map(opt => opt.id === optionId ? {
          ...opt,
          votes: opt.votes + 1
        } : opt);
        setUser(prev => ({
          ...prev,
          xp: prev.xp + 10,
          points: prev.points + 5
        }));
        if (Math.random() > 0.7) {
          setAchievementText('🎯 Quick Voter! +10 XP');
          setShowAchievement(true);
          setTimeout(() => setShowAchievement(false), 3000);
        }
        return {
          ...poll,
          options: updatedOptions,
          totalVotes: poll.totalVotes + 1,
          userVote: optionId
        };
      }
      return poll;
    }));
  };
  const handleLike = (pollId: string) => {
    setPolls(polls.map(poll => poll.id === pollId ? {
      ...poll,
      likes: poll.likes + 1
    } : poll));
  };
  const handleReaction = (pollId: string, emoji: string) => {
    setPollReactions(prev => {
      const reactions = prev[pollId] || [];
      const existingReaction = reactions.find(r => r.emoji === emoji);
      if (existingReaction) {
        return {
          ...prev,
          [pollId]: reactions.map(r => r.emoji === emoji ? {
            ...r,
            count: r.count + 1,
            users: [...r.users, user.username]
          } : r)
        };
      } else {
        return {
          ...prev,
          [pollId]: [...reactions, {
            emoji,
            count: 1,
            users: [user.username]
          }]
        };
      }
    });
    setShowReactions(null);
    setUser(prev => ({
      ...prev,
      xp: prev.xp + 2,
      points: prev.points + 1
    }));
  };
  const handleAddComment = (pollId: string, text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: user.username,
      avatar: user.avatar,
      text,
      timestamp: 'Just now',
      likes: 0
    };
    setPollComments(prev => ({
      ...prev,
      [pollId]: [...(prev[pollId] || []), newComment]
    }));
    setPolls(polls.map(p => p.id === pollId ? {
      ...p,
      comments: p.comments + 1
    } : p));
    setUser(prev => ({
      ...prev,
      xp: prev.xp + 5,
      points: prev.points + 2
    }));
  };
  const filteredPolls = polls.filter(poll => !filterTag || poll.tags.includes(filterTag)).sort((a, b) => {
    if (sortBy === 'votes') return b.totalVotes - a.totalVotes;
    if (sortBy === 'trending') return b.likes - a.likes;
    return 0;
  });
  const unreadCount = notifications.filter(n => !n.read).length;
  return <div data-id={dataId} className="relative w-full min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md mx-auto h-screen flex flex-col bg-white/10 backdrop-blur-sm">
        <motion.header initial={{
        y: -20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} className="bg-white/20 backdrop-blur-md border-b border-white/30 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <ZapIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">ChoiceUp</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentScreen('challenges')} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <TargetIcon className="w-5 h-5 text-white" />
            </button>
            <button onClick={() => setCurrentScreen('search')} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <SearchIcon className="w-5 h-5 text-white" />
            </button>
            <button onClick={() => setCurrentScreen('notifications')} className="relative p-2 hover:bg-white/20 rounded-full transition-colors">
              <BellIcon className="w-5 h-5 text-white" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {unreadCount}
                </span>}
            </button>
          </div>
        </motion.header>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentScreen === 'home' && <HomeScreen key="home" polls={filteredPolls} onVote={handleVote} onLike={handleLike} onShowComments={poll => {
            setSelectedPoll(poll);
            setShowComments(true);
          }} onShowReactions={setShowReactions} onShowShare={setShowShare} pollReactions={pollReactions} filterTag={filterTag} onFilterTag={setFilterTag} sortBy={sortBy} onSortBy={setSortBy} />}
            {currentScreen === 'create' && <CreatePollScreen key="create" onClose={() => setCurrentScreen('home')} />}
            {currentScreen === 'friends' && <FriendsScreen key="friends" friends={friends} onSelectFriend={friend => {
            setSelectedFriend(friend);
            setCurrentScreen('chat');
          }} />}
            {currentScreen === 'chat' && <ChatScreen key="chat" friend={selectedFriend} onBack={() => setCurrentScreen('friends')} />}
            {currentScreen === 'profile' && <ProfileScreen key="profile" user={user} onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')} onNavigateToChallenges={() => setCurrentScreen('challenges')} />}
            {currentScreen === 'notifications' && <NotificationsScreen key="notifications" notifications={notifications} onClose={() => setCurrentScreen('home')} onMarkRead={id => {
            setNotifications(notifications.map(n => n.id === id ? {
              ...n,
              read: true
            } : n));
          }} />}
            {currentScreen === 'search' && <SearchScreen key="search" searchQuery={searchQuery} onSearchChange={setSearchQuery} polls={polls} onClose={() => setCurrentScreen('home')} />}
            {currentScreen === 'leaderboard' && <LeaderboardScreen key="leaderboard" currentUser={user} onClose={() => setCurrentScreen('profile')} />}
            {currentScreen === 'challenges' && <ChallengesScreen key="challenges" challenges={dailyChallenges} onClose={() => setCurrentScreen('home')} />}
          </AnimatePresence>
        </div>

        <motion.nav initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} className="bg-white/20 backdrop-blur-md border-t border-white/30 px-4 py-2">
          <div className="flex items-center justify-around">
            <NavButton icon={HomeIcon} label="Home" active={currentScreen === 'home'} onClick={() => setCurrentScreen('home')} />
            <NavButton icon={UsersIcon} label="Friends" active={currentScreen === 'friends'} onClick={() => setCurrentScreen('friends')} />
            <button onClick={() => setCurrentScreen('create')} className="relative -mt-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <PlusCircleIcon className="w-8 h-8 text-white" />
            </button>
            <NavButton icon={MessageCircleIcon} label="Chat" active={currentScreen === 'chat'} onClick={() => setCurrentScreen('friends')} />
            <NavButton icon={UserIcon} label="Profile" active={currentScreen === 'profile'} onClick={() => setCurrentScreen('profile')} />
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {showComments && selectedPoll && <CommentsModal poll={selectedPoll} comments={pollComments[selectedPoll.id] || []} onClose={() => setShowComments(false)} onAddComment={text => handleAddComment(selectedPoll.id, text)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showReactions && <ReactionsPicker pollId={showReactions} onSelect={emoji => handleReaction(showReactions, emoji)} onClose={() => setShowReactions(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showShare && <ShareSheet pollId={showShare} onClose={() => setShowShare(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showAchievement && <motion.div initial={{
        y: -100,
        opacity: 0
      }} animate={{
        y: 20,
        opacity: 1
      }} exit={{
        y: -100,
        opacity: 0
      }} className="fixed top-0 left-1/2 -translate-x-1/2 z-50 max-w-sm">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <TrophyIcon className="w-5 h-5" />
              <span className="font-semibold">{achievementText}</span>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};
const NavButton: React.FC<{
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({
  icon: Icon,
  label,
  active,
  onClick
}) => <button onClick={onClick} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${active ? 'text-white' : 'text-white/60 hover:text-white/80'}`}>
    <Icon className={`w-6 h-6 ${active ? 'scale-110' : ''} transition-transform`} />
    <span className="text-xs font-medium">{label}</span>
  </button>;
const HomeScreen: React.FC<{
  polls: Poll[];
  onVote: (pollId: string, optionId: string) => void;
  onLike: (pollId: string) => void;
  onShowComments: (poll: Poll) => void;
  onShowReactions: (pollId: string) => void;
  onShowShare: (pollId: string) => void;
  pollReactions: Record<string, Reaction[]>;
  filterTag: string | null;
  onFilterTag: (tag: string | null) => void;
  sortBy: 'recent' | 'trending' | 'votes';
  onSortBy: (sort: 'recent' | 'trending' | 'votes') => void;
}> = ({
  polls,
  onVote,
  onLike,
  onShowComments,
  onShowReactions,
  onShowShare,
  pollReactions,
  filterTag,
  onFilterTag,
  sortBy,
  onSortBy
}) => {
  const allTags = ['fashion', 'travel', 'food', 'tech', 'fitness', 'design', 'homedecor'];
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="h-full overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 p-3 space-y-3">
        <div className="flex items-center gap-2">
          <FilterIcon className="w-4 h-4 text-gray-600" />
          <div className="flex gap-2 overflow-x-auto">
            <button onClick={() => onSortBy('recent')} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${sortBy === 'recent' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
              <ClockIcon className="w-3 h-3 inline mr-1" />
              Recent
            </button>
            <button onClick={() => onSortBy('trending')} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${sortBy === 'trending' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
              <div className="w-3 h-3 inline mr-1" />
              Trending
            </button>
            <button onClick={() => onSortBy('votes')} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${sortBy === 'votes' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
              <BarChart3Icon className="w-3 h-3 inline mr-1" />
              Most Voted
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <button onClick={() => onFilterTag(null)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${!filterTag ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
            All
          </button>
          {allTags.map(tag => <button key={tag} onClick={() => onFilterTag(tag)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filterTag === tag ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
              #{tag}
            </button>)}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {polls.map((poll, index) => <motion.div key={poll.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1
      }}>
            <PollCard poll={poll} onVote={onVote} onLike={onLike} onShowComments={onShowComments} onShowReactions={onShowReactions} onShowShare={onShowShare} reactions={pollReactions[poll.id] || []} />
          </motion.div>)}
      </div>
    </motion.div>;
};
const PollCard: React.FC<{
  poll: Poll;
  onVote: (pollId: string, optionId: string) => void;
  onLike: (pollId: string) => void;
  onShowComments: (poll: Poll) => void;
  onShowReactions: (pollId: string) => void;
  onShowShare: (pollId: string) => void;
  reactions: Reaction[];
}> = ({
  poll,
  onVote,
  onLike,
  onShowComments,
  onShowReactions,
  onShowShare,
  reactions
}) => {
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      onLike(poll.id);
    }
  };
  const totalReactions = reactions.reduce((sum, r) => sum + r.count, 0);
  return <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
      <div className="p-4 flex items-center gap-3">
        <img src={poll.user.avatar} alt={poll.user.username} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{poll.user.username}</p>
          <p className="text-xs text-gray-500">{poll.timestamp}</p>
        </div>
      </div>

      <div className="px-4 pb-3">
        <p className="text-gray-800">{poll.description}</p>
        <div className="flex gap-2 mt-2">
          {poll.tags.map(tag => <span key={tag} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              #{tag}
            </span>)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-4 pb-4">
        {poll.options.map(option => {
        const percentage = poll.totalVotes > 0 ? option.votes / poll.totalVotes * 100 : 0;
        const isVoted = poll.userVote === option.id;
        return <motion.button key={option.id} onClick={() => !poll.userVote && onVote(poll.id, option.id)} disabled={!!poll.userVote} whileHover={!poll.userVote ? {
          scale: 1.02
        } : {}} whileTap={!poll.userVote ? {
          scale: 0.98
        } : {}} className={`relative overflow-hidden rounded-xl ${poll.userVote ? 'cursor-default' : 'cursor-pointer'}`}>
              <img src={option.image} alt={option.text} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-semibold text-sm mb-1">
                  {option.text}
                </p>
                {poll.userVote && <div className="space-y-1">
                    <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
                      <motion.div initial={{
                  width: 0
                }} animate={{
                  width: `${percentage}%`
                }} transition={{
                  duration: 0.5
                }} className={`h-full ${isVoted ? 'bg-green-400' : 'bg-white/60'}`}></motion.div>
                    </div>
                    <p className="text-white text-xs font-medium">
                      {Math.round(percentage)}% ({option.votes} votes)
                    </p>
                  </div>}
                {isVoted && <div className="absolute top-2 right-2">
                    <CheckCircleIcon className="w-6 h-6 text-green-400" />
                  </div>}
              </div>
            </motion.button>;
      })}
      </div>

      {reactions.length > 0 && <div className="px-4 pb-2">
          <div className="flex items-center gap-1 flex-wrap">
            {reactions.slice(0, 3).map((reaction, idx) => <span key={idx} className="text-sm">
                {reaction.emoji}
              </span>)}
            <span className="text-xs text-gray-500 ml-1">
              {totalReactions} {totalReactions === 1 ? 'reaction' : 'reactions'}
            </span>
          </div>
        </div>}

      <div className="px-4 pb-4 flex items-center gap-4 text-gray-600">
        <motion.button whileTap={{
        scale: 0.9
      }} onClick={handleLike} className="flex items-center gap-1 hover:text-red-500 transition-colors">
          <HeartIcon className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
          <span className="text-sm font-medium">{poll.likes}</span>
        </motion.button>

        <button onClick={() => onShowComments(poll)} className="flex items-center gap-1 hover:text-blue-500 transition-colors">
          <MessageSquareIcon className="w-5 h-5" />
          <span className="text-sm font-medium">{poll.comments}</span>
        </button>

        <button onClick={() => onShowReactions(poll.id)} className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
          <SmileIcon className="w-5 h-5" />
        </button>

        <button onClick={() => onShowShare(poll.id)} className="flex items-center gap-1 hover:text-green-500 transition-colors ml-auto">
          <ShareIcon className="w-5 h-5" />
        </button>
      </div>
    </div>;
};
const CommentsModal: React.FC<{
  poll: Poll;
  comments: Comment[];
  onClose: () => void;
  onAddComment: (text: string) => void;
}> = ({
  poll,
  comments,
  onClose,
  onAddComment
}) => {
  const [commentText, setCommentText] = useState('');
  const handleSubmit = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText('');
    }
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={onClose}>
      <motion.div initial={{
      y: '100%'
    }} animate={{
      y: 0
    }} exit={{
      y: '100%'
    }} transition={{
      type: 'spring',
      damping: 30
    }} onClick={e => e.stopPropagation()} className="bg-white rounded-t-3xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-bold">Comments</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((comment, index) => <motion.div key={comment.id} initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.05
        }} className="flex gap-3">
              <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <p className="font-semibold text-sm">{comment.user}</p>
                  <p className="text-sm text-gray-800">{comment.text}</p>
                </div>
                <div className="flex items-center gap-3 mt-1 px-2">
                  <span className="text-xs text-gray-500">
                    {comment.timestamp}
                  </span>
                  <button className="text-xs text-gray-500 hover:text-purple-600">
                    <ThumbsUpIcon className="w-3 h-3 inline mr-1" />
                    {comment.likes}
                  </button>
                  <button className="text-xs text-gray-500 hover:text-purple-600">
                    Reply
                  </button>
                </div>
              </div>
            </motion.div>)}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input type="text" value={commentText} onChange={e => setCommentText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSubmit()} placeholder="Add a comment..." className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            <motion.button whileTap={{
            scale: 0.9
          }} onClick={handleSubmit} disabled={!commentText.trim()} className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center disabled:opacity-50">
              <SendIcon className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>;
};
const ReactionsPicker: React.FC<{
  pollId: string;
  onSelect: (emoji: string) => void;
  onClose: () => void;
}> = ({
  pollId,
  onSelect,
  onClose
}) => {
  const reactions = ['❤️', '🔥', '👍', '😍', '🎉', '💯', '⭐', '✨'];
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center" onClick={onClose}>
      <motion.div initial={{
      scale: 0.8,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} exit={{
      scale: 0.8,
      opacity: 0
    }} onClick={e => e.stopPropagation()} className="bg-white rounded-2xl p-4 shadow-xl">
        <div className="grid grid-cols-4 gap-3">
          {reactions.map((emoji, index) => <motion.button key={emoji} initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: index * 0.05
        }} whileHover={{
          scale: 1.2
        }} whileTap={{
          scale: 0.9
        }} onClick={() => onSelect(emoji)} className="w-12 h-12 text-2xl hover:bg-gray-100 rounded-full flex items-center justify-center">
              {emoji}
            </motion.button>)}
        </div>
      </motion.div>
    </motion.div>;
};
const ShareSheet: React.FC<{
  pollId: string;
  onClose: () => void;
}> = ({
  pollId,
  onClose
}) => {
  const shareOptions = [{
    icon: MessageCircleIcon,
    label: 'Message',
    color: 'text-blue-600'
  }, {
    icon: UsersIcon,
    label: 'Friends',
    color: 'text-purple-600'
  }, {
    icon: LinkIcon,
    label: 'Copy Link',
    color: 'text-green-600'
  }, {
    icon: MoreHorizontalIcon,
    label: 'More',
    color: 'text-gray-600'
  }];
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={onClose}>
      <motion.div initial={{
      y: '100%'
    }} animate={{
      y: 0
    }} exit={{
      y: '100%'
    }} transition={{
      type: 'spring',
      damping: 30
    }} onClick={e => e.stopPropagation()} className="bg-white rounded-t-3xl w-full max-w-md p-6">
        <h3 className="text-lg font-bold mb-4">Share Poll</h3>
        <div className="grid grid-cols-4 gap-4">
          {shareOptions.map((option, index) => <motion.button key={option.label} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.05
        }} className="flex flex-col items-center gap-2">
              <div className={`w-14 h-14 ${option.color} bg-gray-100 rounded-full flex items-center justify-center`}>
                <option.icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-gray-700">{option.label}</span>
            </motion.button>)}
        </div>
      </motion.div>
    </motion.div>;
};
const LeaderboardScreen: React.FC<{
  currentUser: User;
  onClose: () => void;
}> = ({
  currentUser,
  onClose
}) => {
  const leaderboard = [{
    rank: 1,
    username: 'poll_queen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    xp: 5420,
    badge: '👑'
  }, {
    rank: 2,
    username: 'decision_master',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    xp: 4890,
    badge: '🥈'
  }, {
    rank: 3,
    username: 'vote_ninja',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    xp: 4320,
    badge: '🥉'
  }, {
    rank: 4,
    username: 'trend_setter',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    xp: 3890
  }, {
    rank: 5,
    username: 'choice_guru',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    xp: 3450
  }, {
    rank: 12,
    username: currentUser.username,
    avatar: currentUser.avatar,
    xp: currentUser.xp,
    isCurrentUser: true
  }];
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="h-full overflow-y-auto bg-white/90 backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {leaderboard.map((user, index) => <motion.div key={user.username} initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: index * 0.05
      }} className={`p-4 rounded-xl flex items-center gap-3 ${user.isCurrentUser ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300' : 'bg-white shadow-sm'}`}>
            <div className="text-2xl font-bold text-gray-400 w-8">
              {user.badge || `#${user.rank}`}
            </div>
            <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {user.username}
                {user.isCurrentUser && <span className="text-purple-600 ml-2">(You)</span>}
              </p>
              <p className="text-sm text-gray-500">{user.xp} XP</p>
            </div>
            <TrophyIcon className="w-5 h-5 text-yellow-500" />
          </motion.div>)}
      </div>
    </motion.div>;
};
const ChallengesScreen: React.FC<{
  challenges: DailyChallenge[];
  onClose: () => void;
}> = ({
  challenges,
  onClose
}) => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="h-full overflow-y-auto bg-white/90 backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Daily Challenges</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {challenges.map((challenge, index) => {
        const progress = challenge.progress / challenge.total * 100;
        const isComplete = challenge.progress >= challenge.total;
        return <motion.div key={challenge.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} className={`p-4 rounded-xl ${isComplete ? 'bg-gradient-to-r from-green-100 to-emerald-100' : 'bg-white shadow-sm'}`}>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{challenge.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{challenge.title}</h3>
                  <p className="text-sm text-gray-600">
                    {challenge.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-purple-600">
                    +{challenge.reward} XP
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {challenge.progress} / {challenge.total}
                  </span>
                  <span className="font-medium text-gray-900">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div initial={{
                width: 0
              }} animate={{
                width: `${progress}%`
              }} transition={{
                duration: 0.5,
                delay: index * 0.1
              }} className={`h-full ${isComplete ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-purple-600 to-pink-600'}`} />
                </div>
              </div>

              {isComplete && <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} className="mt-3 flex items-center justify-center gap-2 text-green-600">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span className="font-semibold">Completed!</span>
                </motion.div>}
            </motion.div>;
      })}
      </div>
    </motion.div>;
};
const CreatePollScreen: React.FC<{
  onClose: () => void;
}> = ({
  onClose
}) => {
  const [description, setDescription] = useState('');
  return <motion.div initial={{
    opacity: 0,
    scale: 0.95
  }} animate={{
    opacity: 1,
    scale: 1
  }} exit={{
    opacity: 0,
    scale: 0.95
  }} className="h-full bg-white/90 backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">Create Poll</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold">
          Post
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What do you need help deciding?
          </label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your decision..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" rows={3} />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Add Options (2 required)
          </label>

          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className="w-full h-40 border-2 border-dashed border-purple-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <ImageIcon className="w-8 h-8 text-purple-500" />
            <span className="text-sm font-medium text-purple-600">
              Upload Option A
            </span>
          </motion.button>

          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className="w-full h-40 border-2 border-dashed border-pink-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-pink-500 hover:bg-pink-50 transition-colors">
            <ImageIcon className="w-8 h-8 text-pink-500" />
            <span className="text-sm font-medium text-pink-600">
              Upload Option B
            </span>
          </motion.button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Who can vote?
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
              Friends
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
              Public
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
              Custom
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Tags
          </label>
          <input type="text" placeholder="fashion, style, party" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        </div>
      </div>
    </motion.div>;
};
const FriendsScreen: React.FC<{
  friends: Friend[];
  onSelectFriend: (friend: Friend) => void;
}> = ({
  friends,
  onSelectFriend
}) => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="h-full overflow-y-auto bg-white/90 backdrop-blur-sm">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Friends</h2>
        <div className="space-y-2">
          {friends.map((friend, index) => <motion.button key={friend.id} initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.05
        }} onClick={() => onSelectFriend(friend)} className="w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="relative">
                <img src={friend.avatar} alt={friend.username} className="w-12 h-12 rounded-full object-cover" />
                {friend.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">{friend.username}</p>
                <p className="text-sm text-gray-500">{friend.recentActivity}</p>
              </div>
              <div className="text-xs text-gray-400">{friend.lastActive}</div>
            </motion.button>)}
        </div>
      </div>
    </motion.div>;
};
const ChatScreen: React.FC<{
  friend: Friend | null;
  onBack: () => void;
}> = ({
  friend,
  onBack
}) => {
  const [message, setMessage] = useState('');
  const [messages] = useState<Message[]>([{
    id: '1',
    sender: friend?.username || '',
    text: 'Hey! Did you see my latest poll?',
    timestamp: '10:30 AM',
    isOwn: false
  }, {
    id: '2',
    sender: 'you',
    text: 'Yes! I voted for option B 😊',
    timestamp: '10:32 AM',
    isOwn: true
  }, {
    id: '3',
    sender: friend?.username || '',
    text: 'Thanks! What made you choose that one?',
    timestamp: '10:33 AM',
    isOwn: false
  }, {
    id: '4',
    sender: 'you',
    text: 'I think it suits you better!',
    timestamp: '10:35 AM',
    isOwn: true
  }]);
  if (!friend) return null;
  return <motion.div initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: -20
  }} className="h-full flex flex-col bg-white/90 backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <XIcon className="w-6 h-6" />
        </button>
        <img src={friend.avatar} alt={friend.username} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{friend.username}</p>
          <p className="text-xs text-green-500">{friend.lastActive}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => <motion.div key={msg.id} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1
      }} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${msg.isOwn ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.isOwn ? 'text-white/70' : 'text-gray-500'}`}>
                {msg.timestamp}
              </p>
            </div>
          </motion.div>)}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          <motion.button whileTap={{
          scale: 0.9
        }} className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <SendIcon className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>;
};
const ProfileScreen: React.FC<{
  user: User;
  onNavigateToLeaderboard: () => void;
  onNavigateToChallenges: () => void;
}> = ({
  user,
  onNavigateToLeaderboard,
  onNavigateToChallenges
}) => {
  const achievements = [{
    id: 'first_vote',
    name: 'First Vote',
    icon: '🎯',
    unlocked: true
  }, {
    id: 'poll_master',
    name: 'Poll Master',
    icon: '👑',
    unlocked: true
  }, {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    icon: '🦋',
    unlocked: true
  }, {
    id: 'trendsetter',
    name: 'Trendsetter',
    icon: '⭐',
    unlocked: true
  }, {
    id: 'influencer',
    name: 'Influencer',
    icon: '💎',
    unlocked: false
  }, {
    id: 'legend',
    name: 'Legend',
    icon: '🏆',
    unlocked: false
  }];
  const levelProgress = user.xp % 1000 / 1000 * 100;
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="h-full overflow-y-auto bg-white/90 backdrop-blur-sm">
      <div className="p-4 space-y-6">
        <div className="text-center">
          <div className="relative inline-block">
            <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">
              {user.level}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            @{user.username}
          </h2>
          <p className="text-gray-600 mt-1">{user.bio}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 text-center">
            <ZapIcon className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-purple-900">{user.xp}</p>
            <p className="text-xs text-purple-700">XP</p>
          </div>
          <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl p-4 text-center">
            <StarIcon className="w-6 h-6 text-pink-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-pink-900">{user.points}</p>
            <p className="text-xs text-pink-700">Points</p>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-4 text-center">
            <TrophyIcon className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-orange-900">
              {user.achievements.length}
            </p>
            <p className="text-xs text-orange-700">Badges</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Level {user.level}
            </span>
            <span className="text-sm text-gray-500">
              {user.xp % 1000}/1000 XP
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div initial={{
            width: 0
          }} animate={{
            width: `${levelProgress}%`
          }} transition={{
            duration: 1,
            ease: 'easeOut'
          }} className="h-full bg-gradient-to-r from-purple-600 to-pink-600"></motion.div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => <motion.div key={achievement.id} initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: index * 0.05
          }} className={`aspect-square rounded-xl p-3 flex flex-col items-center justify-center ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-100 to-orange-100' : 'bg-gray-100'}`}>
                <span className="text-3xl mb-1">{achievement.icon}</span>
                <p className={`text-xs font-medium text-center ${achievement.unlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                  {achievement.name}
                </p>
              </motion.div>)}
          </div>
        </div>

        <div className="space-y-2">
          <button onClick={onNavigateToLeaderboard} className="w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <TrophyIcon className="w-5 h-5 text-yellow-600" />
            <span className="flex-1 text-left font-medium text-gray-900">
              Leaderboard
            </span>
          </button>
          <button onClick={onNavigateToChallenges} className="w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <TargetIcon className="w-5 h-5 text-purple-600" />
            <span className="flex-1 text-left font-medium text-gray-900">
              Daily Challenges
            </span>
          </button>
          <button className="w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <SettingsIcon className="w-5 h-5 text-gray-600" />
            <span className="flex-1 text-left font-medium text-gray-900">
              Settings
            </span>
          </button>
          <button className="w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <LogOutIcon className="w-5 h-5 text-red-600" />
            <span className="flex-1 text-left font-medium text-red-600">
              Log Out
            </span>
          </button>
        </div>
      </div>
    </motion.div>;
};
const NotificationsScreen: React.FC<{
  notifications: Notification[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
}> = ({
  notifications,
  onClose,
  onMarkRead
}) => {
  return <motion.div initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: -20
  }} className="h-full overflow-y-auto bg-white/90 backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 space-y-2">
        {notifications.map((notification, index) => <motion.div key={notification.id} initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: index * 0.05
      }} onClick={() => onMarkRead(notification.id)} className={`p-4 rounded-xl flex items-start gap-3 cursor-pointer transition-colors ${notification.read ? 'bg-white' : 'bg-purple-50'}`}>
            {notification.avatar ? <img src={notification.avatar} alt={notification.user} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <TrophyIcon className="w-5 h-5 text-white" />
              </div>}
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                {notification.user && <span className="font-semibold">{notification.user} </span>}
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {notification.timestamp}
              </p>
            </div>
            {!notification.read && <div className="w-2 h-2 bg-purple-600 rounded-full"></div>}
          </motion.div>)}
      </div>
    </motion.div>;
};
const SearchScreen: React.FC<{
  searchQuery: string;
  onSearchChange: (query: string) => void;
  polls: Poll[];
  onClose: () => void;
}> = ({
  searchQuery,
  onSearchChange,
  polls,
  onClose
}) => {
  const trendingTags = ['fashion', 'travel', 'food', 'tech', 'fitness', 'design'];
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="h-full overflow-y-auto bg-white/90 backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <XIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Search users, polls, tags..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent" autoFocus />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUpIcon className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">Trending</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map(tag => <motion.button key={tag} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium">
                #{tag}
              </motion.button>)}
          </div>
        </div>

        {!searchQuery && <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Recent</h3>
            <div className="space-y-2">
              {['fashion trends', 'vacation ideas', 'dinner recipes'].map((search, index) => <motion.button key={search} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.05
          }} className="w-full p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-3 text-left">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{search}</span>
                  </motion.button>)}
            </div>
          </div>}
      </div>
    </motion.div>;
};