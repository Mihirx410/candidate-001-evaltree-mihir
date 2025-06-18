import { rest } from 'msw';

let raffleTickets = {};
let enrolledUsers = new Set();

export const handlers = [
  rest.post('/api/createCollectible', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Collectible created successfully!',
        data: {
          id: Math.floor(Math.random() * 100000),
          ...req.body,
        },
      })
    );
  }),
  rest.get('/api/collectibles', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'Golden Owl',
          description: 'A rare digital owl with gold accents.',
          cap: 50,
          available: 12,
        },
        {
          id: 2,
          name: 'Emerald Fox',
          description: 'A limited-edition fox with emerald fur.',
          cap: 30,
          available: 5,
        },
        {
          id: 3,
          name: 'Lime Panther',
          description: 'A vibrant panther collectible.',
          cap: 20,
          available: 1,
        },
      ])
    );
  }),
  rest.get('/api/raffle-status', (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId');
    return res(
      ctx.status(200),
      ctx.json({ tickets: raffleTickets[userId] || 0 })
    );
  }),
  rest.post('/api/raffle-award', async (req, res, ctx) => {
    const { userId } = await req.json();
    raffleTickets[userId] = (raffleTickets[userId] || 0) + 1;
    return res(
      ctx.status(200),
      ctx.json({ message: 'Raffle ticket awarded!', tickets: raffleTickets[userId] })
    );
  }),
  rest.post('/api/enroll', async (req, res, ctx) => {
    const { userId, platform } = await req.json();
    enrolledUsers.add(userId);
    return res(
      ctx.status(200),
      ctx.json({ message: `User Enrolled in ${platform} Ecosystem` })
    );
  }),
  // Add more handlers as needed
]; 