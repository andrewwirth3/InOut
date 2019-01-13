const persons = [
    {
        id: 1,
        name: 'Andrew Wirth',
        phone: 3191112233,
        email: 'test@gmail.com',
        status: 'A'
    },
    {
        id: 2,
        name: 'David Wirth',
        phone: 3191114444,
        email: 'test1@gmail.com',
        status: 'A'
    }
];

const squads = [
    {
        id: 1,
        name: 'Squad 1',
        status: 'A',
        created: new Date(),
        owner: 1
    },
    {
        id: 2,
        name: 'Squirtle Squad',
        status: 'A',
        created: new Date(),
        owner: 2
    }
];

const squadMembers = [
    {
        id: 1,
        squadId: 1,
        personId: 1,
        status: 'A',
        sequence: 1
    },
    {
        id: 2,
        squadId: 1,
        personId: 2,
        status: 'A',
        sequence: 2
    },
    {
        id: 3,
        squadId: 2,
        personId: 2,
        status: 'A',
        sequence: 1
    },
    {
        id: 4,
        squadId: 2,
        personId: 1,
        status: 'A',
        sequence: 3
    }
];

const series = [
    {
        id: 1,
        squadId: 1,
        start: new Date('2018-01-01'),
        end: new Date('2018-05-01'),
        status: 'A'
    }
];

const events = [
    {
        id: 1,
        seriesId: 1,
        desc: 'Softball 1',
        date: new Date('2018-01-01'),
        location: 'Bridsall',
        min: 10,
        in: 8,
        out: 0,
        total: 15
    },
    {
        id: 2,
        seriesId: 1,
        desc: 'Softball 2',
        date: new Date('2018-02-01'),
        location: 'Bridsall',
        min: 10,
        in: 12,
        out: 1,
        total: 15
    },
    {
        id: 3,
        seriesId: 1,
        desc: 'Softball 3',
        date: new Date('2018-03-01'),
        location: 'Bridsall',
        min: 9,
        in: 4,
        out: 2,
        total: 15
    },
    {
        id: 4,
        seriesId: 1,
        desc: 'Softball 4',
        date: new Date('2018-04-01'),
        location: 'Bridsall',
        min: 9,
        in: 9,
        out: 3,
        total: 15
    },
    {
        id: 5,
        seriesId: 1,
        desc: 'Softball 5',
        date: new Date('2018-05-01'),
        location: 'Bridsall',
        min: 9,
        in: 6,
        out: 4,
        total: 15
    }
];

const responses = [
    {
        id: 1,
        eventId: 1,
        personId: 1,
        status: 1
    },
    {
        id: 1,
        eventId: 1,
        personId: 2,
        status: null
    },
    {
        id: 1,
        eventId: 2,
        personId: 1,
        status: 0
    },
    {
        id: 1,
        eventId: 2,
        personId: 2,
        status: null
    },
    {
        id: 1,
        eventId: 3,
        personId: 1,
        status: null
    },
    {
        id: 1,
        eventId: 3,
        personId: 2,
        status: null
    },
    {
        id: 1,
        eventId: 4,
        personId: 1,
        status: null
    },
    {
        id: 1,
        eventId: 4,
        personId: 2,
        status: null
    },
    {
        id: 1,
        eventId: 5,
        personId: 1,
        status: null
    },
    {
        id: 1,
        eventId: 5,
        personId: 2,
        status: null
    }
];

const staticData = {
    persons,
    squads,
    squadMembers,
    series,
    events,
    responses
};

export { staticData };
