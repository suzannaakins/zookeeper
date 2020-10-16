const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal,
} = require("../lib/animals.js");
const { animals } = require("../data/animals");

jest.mock('fs');

test("create an animal object", () => {
    const animal = createNewAnimal(
        { name: "Robert", id: "5" },
        animals
    );
    expect(animal.name).toBe("Robert");
    expect(animal.id).toBe("5");
});

test("filters by query", () => {
    const startingAnimals = [
        {
            id: '4',
            name: 'Elton',
            species: "bobcat",
            diet: "omnivore",
            personalityTraits: ["quirky", 'hard-headed'],
        },
        {
            id: '6',
            name: "Marla",
            species: "honey badger",
            diet: "carnivore",
            personalityTraits: ["don't give a shit", "quick"],
        },
    ];

    const updatedAnimals = filterByQuery({ species: "honey badger" }, startingAnimals);
    expect(updatedAnimals.length).toEqual(1);
});

test("finds by id", () => {
    const startingAnimals = [
        {
            id: '4',
            name: 'Elton',
            species: "bobcat",
            diet: "omnivore",
            personalityTraits: ["quirky", 'hard-headed'],
        },
        {
            id: '6',
            name: "Marla",
            species: "honey badger",
            diet: "carnivore",
            personalityTraits: ["don't give a shit", "quick"],
        },
    ]

    const result = findById("4", startingAnimals);
    expect(result.name).toBe("Elton");
});

test("validates personality traits", () => {
    const animal = {
        id: '6',
        name: "Marla",
        species: "honey badger",
        diet: "carnivore",
        personalityTraits: ["don't give a shit", "quick"],
    };

    const invalidAnimal = {
        id: '6',
        name: "Marla",
        species: "honey badger",
        diet: "carnivore",
    };
    const result = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});

