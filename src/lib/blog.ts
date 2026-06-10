// Absolute Fitness Studio — blog content. Three seed posts with full body copy
// in the brand voice (plain, active, motivating, South-African-grounded).

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string; // ISO
  author: string;
  cover: string;
  body: string[]; // paragraphs (rendered in order)
};

export const POSTS: BlogPost[] = [
  {
    slug: "boost-your-health-with-expert-trainers",
    title: "Boost Your Health with Expert Trainers at Absolute Fitness Studio",
    excerpt:
      "Great training is more than counting reps. See how coaching, accountability and a plan built around your life turn effort into real results.",
    readTime: "4 min read",
    date: "2025-09-12",
    author: "Absolute Fitness Studio",
    cover:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1100&q=80",
    body: [
      "Starting a fitness journey on your own is hard. You guess at the right exercises, you are not sure how heavy to go, and when life gets busy the routine is the first thing to slip. That is exactly the gap a good trainer fills. At Absolute Fitness Studio our coaches do not just hand you a workout — they teach you how to move well, how to push safely, and how to keep showing up.",
      "Every member starts with a conversation. Where are you now, where do you want to be, and what does a realistic week actually look like for you? From there we build a plan that fits around work, family and the Lawley commute — not the other way around. Training should slot into your life, not take it over.",
      "Expert coaching also means progression you can feel. We track your sessions, nudge the numbers up when you are ready, and pull back when your body needs it. That balance of challenge and recovery is what keeps you improving week after week instead of burning out in the first month.",
      "Just as important is the accountability. When a coach knows your name and your goals, missing a session is a decision you have to make on purpose. Most people find that the gentle expectation is exactly the push they needed. You stop negotiating with yourself and start building a habit.",
      "Health is the long game, and you do not have to play it alone. Whether you are brand new to training or coming back after a break, our trainers meet you where you are and walk the road with you. Come in, have that first chat, and let us build something that lasts.",
    ],
  },
  {
    slug: "join-our-community-flexible-memberships",
    title: "Join Our Community: Flexible Memberships for Everyone",
    excerpt:
      "Life is busy and no two weeks look the same. Our memberships flex with your schedule so consistency is finally realistic.",
    readTime: "3 min read",
    date: "2025-10-03",
    author: "Absolute Fitness Studio",
    cover:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1100&q=80",
    body: [
      "The biggest reason people quit the gym is not a lack of motivation — it is a plan that does not fit their life. A rigid contract that assumes you can train at the same time every day sets most of us up to fail. So we built our memberships differently: flexible, honest, and designed for real South African schedules.",
      "Whether you want structured bootcamp sessions, coached group classes, or one-on-one private training, you choose the format that matches your week. Shift work, school runs, month-end crunch — your training bends around all of it. Consistency stops being a battle and starts being normal.",
      "Community is the other half of the equation. When you train alongside people who know your name and cheer your wins, the whole thing gets easier. Our floor is welcoming by design: no judgement, no intimidation, just people working hard and lifting each other up.",
      "Joining is simple. Pick the plan that fits, and our team helps you get going from your very first session. As your goals shift, your plan can shift with them. That is the whole point — a membership that grows with you instead of holding you back.",
      "If you have been waiting for the right time to start, this is it. Come see the space, meet the coaches, and find out how good it feels to belong to a community that wants you to win.",
    ],
  },
  {
    slug: "stay-fit-personalized-plans",
    title: "Stay Fit: Personalized Plans at Absolute Fitness Studio",
    excerpt:
      "A plan built for someone else will only take you so far. Here is how personalised programming keeps you progressing and motivated.",
    readTime: "4 min read",
    date: "2025-10-21",
    author: "Absolute Fitness Studio",
    cover:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1100&q=80",
    body: [
      "Generic workout plans are everywhere, and most of them are not wrong — they are just not yours. They do not know your history, your injuries, your goals or how much time you actually have. A personalised plan starts from those answers, which is why it works when the copy-paste programmes do not.",
      "At Absolute Fitness Studio we design your programme around three things: where you are starting, where you want to go, and what you genuinely enjoy. That last part matters more than people think. The best plan is the one you will actually follow, so we build in movements and sessions you look forward to.",
      "Personalisation continues long after day one. We review your progress regularly and adjust — more volume when you are thriving, smarter recovery when life is heavy, new challenges when you plateau. Your plan is a living thing that responds to you, not a PDF that gathers dust.",
      "This approach also protects you. By matching intensity to your real capacity, we reduce the niggles and setbacks that derail so many fitness journeys. Train hard, yes, but train in a way your body can keep up with for years, not weeks.",
      "Staying fit is not about heroic bursts of effort — it is about a plan that fits and keeps fitting. Let us build yours. Book a session, tell us your goals, and watch how much further you go when the programme is made for you.",
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
