## Overview
ChoiceUpApp is a comprehensive, fully interactive social decision-making mobile app prototype where users create polls with photos/videos, vote on friends' polls, interact through comments and reactions, chat with friends, earn rewards (XP/points/achievements), track progress through daily challenges, compete on leaderboards, and discover trending content. The app features a vibrant, modern design with smooth animations, real-time interactions, and extensive gamification elements.

## Available Imports

**Components:**
- `ChoiceUpApp` - (named export) Main interactive social polling app component with full feature set

**Types:**
All TypeScript interfaces are internal to the component.

## Component Props & Types

```typescript
interface ChoiceUpAppProps {
  'data-id'?: string  // Optional data-id attribute for component identification
}
```

The component is fully self-contained with no required props. All data, state, and interactions are managed internally.

## Import Patterns

```typescript
// Named export
import { ChoiceUpApp } from './ChoiceUpApp'
```

## Usage Requirements

**Dependencies:**
- `framer-motion` - For smooth animations, transitions, and interactive feedback
- `lucide-react` - For comprehensive icon set throughout the interface

**No special context providers or wrappers required** - the component is fully self-contained with complete functionality.

## How It Works

**Core Features:**

1. **Enhanced Home Feed**
   - 7 diverse poll posts with high-quality Unsplash images
   - Filter by tags (fashion, travel, food, tech, fitness, design, homedecor)
   - Sort by Recent, Trending, or Most Voted
   - Interactive voting with real-time percentage updates
   - Emoji reactions system (❤️🔥👍😍🎉💯⭐✨)
   - Comments modal with reply functionality
   - Share sheet with multiple sharing options

2. **Interactive Voting & Engagement**
   - Click poll options to vote (updates counts instantly)
   - Animated progress bars show vote percentages
   - Green checkmark indicates your vote
   - Earn 10 XP + 5 points per vote
   - Random achievement notifications

3. **Comments System**
   - Bottom sheet modal for viewing/adding comments
   - Real-time comment addition
   - Like comments and reply to them
   - Earn 5 XP + 2 points per comment

4. **Reactions System**
   - Emoji picker modal with 8 reaction options
   - Track reaction counts and users
   - Display top 3 reactions on polls
   - Earn 2 XP + 1 point per reaction

5. **Rewards & Gamification**
   - XP system with level progression (Level 12, 2450 XP)
   - Points currency (890 points)
   - Animated level progress bar
   - Achievement system (6 achievements: 4 unlocked, 2 locked)
   - Achievement toast notifications

6. **Daily Challenges**
   - 3 active challenges with progress tracking
   - Vote Master: Vote on 5 polls (3/5 complete)
   - Social Butterfly: Comment on 3 polls (1/3 complete)
   - Trendsetter: Get 100 votes on your poll (67/100 complete)
   - Animated progress bars
   - XP rewards for completion
   - Visual completion indicators

7. **Leaderboard**
   - Global ranking system
   - Top 5 users with badges (👑🥈🥉)
   - Current user highlighted (rank #12)
   - XP-based rankings
   - Accessible from profile screen

8. **Poll Creation**
   - Multi-step creation flow
   - Text description input
   - Image upload placeholders for 2 options
   - Audience selection (Friends/Public/Custom)
   - Tag system for categorization

9. **Friends System**
   - 6 friends with online/offline status
   - Real-time activity indicators
   - Recent activity display
   - Click to open chat

10. **Messaging**
    - One-on-one chat interface
    - Message history with timestamps
    - Send new messages
    - Online status indicators
    - Gradient message bubbles

11. **Profile Management**
    - User stats display (XP, Points, Badges)
    - Level progress visualization
    - Achievement showcase grid
    - Navigation to Leaderboard and Challenges
    - Settings and logout options

12. **Notifications**
    - Activity feed with 4 types: votes, comments, achievements, friend requests
    - Unread badge counter in header
    - Mark as read functionality
    - Visual distinction for unread items

13. **Search & Discovery**
    - Search bar for users, polls, and tags
    - Trending tags display
    - Recent searches history
    - Filter and discovery tools

**Interactions:**
- Vote on polls (click options, see instant results)
- Like posts (heart icon fills red)
- Add emoji reactions (opens picker modal)
- Comment on polls (opens comments modal)
- Share polls (opens share sheet)
- Filter by tags (sticky filter bar)
- Sort content (Recent/Trending/Most Voted)
- Navigate screens via bottom nav
- View and complete daily challenges
- Check leaderboard rankings
- Chat with friends
- All actions provide visual feedback and XP rewards

## Layout & Appearance

**Mobile-First Design:**
- Optimized for mobile screens (max-width: 448px container)
- Full-height viewport layout with fixed header and bottom nav
- Scrollable content area between header and nav
- Vibrant gradient background (purple → pink → orange)
- Glassmorphism effects (backdrop blur, transparency)

**Visual Style:**
- Modern, colorful, energetic aesthetic
- High-quality Unsplash images for all poll content
- Gradient buttons, cards, and interactive elements
- Smooth animations using Framer Motion
- Clean typography with excellent contrast
- Rounded corners throughout (rounded-xl, rounded-2xl, rounded-3xl)
- Staggered list animations for smooth entry
- Spring-based modal animations

**Color Palette:**
- Primary gradient: purple-600 → pink-600
- Background gradient: purple-500 → pink-500 → orange-400
- Success: green-400/500 (votes, completed challenges)
- Rewards: yellow-400/orange-500 (achievements)
- Error/Alert: red-500 (notifications badge)
- Neutral: gray-100 through gray-900

**Responsive Behavior:**
- Adapts to mobile viewport heights
- Scrollable content areas with smooth scrolling
- Touch-friendly tap targets (44px minimum)
- Horizontal scrolling for filter tags
- Modal overlays with backdrop blur

## Styling & Theming

**Built-in Styling:**
- Uses Tailwind CSS utility classes exclusively
- No custom className prop needed
- Fully styled and ready to use

**Animations:**
- Framer Motion for all transitions and interactions
- Staggered list item animations (0.05s-0.1s delays)
- Scale effects on buttons (hover: 1.02-1.05, tap: 0.9-0.98)
- Smooth screen transitions with AnimatePresence
- Progress bar animations (0.5s-1s duration)
- Achievement toast animations (slide from top)
- Modal animations (spring-based, damping: 30)
- Reaction picker animations (staggered scale)

**Interactive States:**
- Hover effects on all clickable elements
- Active states for navigation buttons
- Disabled states for voted polls
- Loading states with animated progress bars
- Success states with green checkmarks
- Unread states with purple highlights

## Code Examples

### Example 1: Basic Usage
```typescript
import { ChoiceUpApp } from './ChoiceUpApp'

function App() {
  return <ChoiceUpApp />
}
```

### Example 2: With Data ID
```typescript
import { ChoiceUpApp } from './ChoiceUpApp'

function App() {
  return <ChoiceUpApp data-id="choice-up-social-app" />
}
```

### Example 3: Full Page Layout
```typescript
import { ChoiceUpApp } from './ChoiceUpApp'

function App() {
  return (
    <div className="w-full min-h-screen">
      <ChoiceUpApp />
    </div>
  )
}
```

### Example 4: Embedded in Container
```typescript
import { ChoiceUpApp } from './ChoiceUpApp'

function App() {
  return (
    <div className="max-w-md mx-auto h-screen">
      <ChoiceUpApp />
    </div>
  )
}
```

### Example 5: Multiple Instances (Demo Purposes)
```typescript
import { ChoiceUpApp } from './ChoiceUpApp'

function App() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="h-screen">
        <ChoiceUpApp data-id="instance-1" />
      </div>
      <div className="h-screen">
        <ChoiceUpApp data-id="instance-2" />
      </div>
    </div>
  )
}
```

**Note:** Each instance maintains its own independent state including votes, comments, reactions, XP, challenges, and navigation. The component includes realistic mock data with:
- 7 diverse polls across multiple categories
- 6 friends with online/offline status
- 4 notifications (2 unread)
- 3 daily challenges with progress
- 6 achievements (4 unlocked)
- Full leaderboard with rankings
- Complete chat message history
- Emoji reactions and comments system
