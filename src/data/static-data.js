const persons = [
    {
        id: 1,
        name: 'Admin',
        phone: 3191112233,
        email: 'test@gmail.com',
        status: 'A'
    },
    {
        id: 2,
        name: 'Test',
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
        Created: new Date(),
        Owner: 1
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
        sequence: 1
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
        min: 2,
        in: 3,
        out: 1,
        total: 4
    },
    {
        id: 2,
        seriesId: 1,
        desc: 'Softball 2',
        date: new Date('2018-02-01'),
        min: 2,
        in: 0,
        out: 1,
        total: 4
    },
    {
        id: 3,
        seriesId: 1,
        desc: 'Softball 3',
        date: new Date('2018-03-01'),
        min: 2,
        in: 0,
        out: 1,
        total: 4
    },
    {
        id: 4,
        seriesId: 1,
        desc: 'Softball 4',
        date: new Date('2018-04-01'),
        min: 2,
        in: 0,
        out: 1,
        total: 4
    },
    {
        id: 5,
        seriesId: 1,
        desc: 'Softball 5',
        date: new Date('2018-05-01'),
        min: 2,
        in: 0,
        out: 1,
        total: 4
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
