const PIDController = require('./PIDController');

test('increase the value up to target with error less than 0.1', () => {
    const pidIncrease = new PIDController(0.15, 0.1, 0.1);

    let input = 10;
    const target = 50;

    pidIncrease.setTarget(target);

    for (let i = 0; i < 100; i++) {
        const correction = pidIncrease.getOutput(input);
        input += correction;
    }

    expect(Math.abs(input - target)).toBeLessThan(0.1);
});

test('decrese the value down to target with error less than 0.1', () => {
    const pidDecrease = new PIDController(0.1, 0.1, 0.1);

    let input = 30;
    const target = 15;

    pidDecrease.setTarget(target);

    for (let i = 0; i < 100; i++) {
        const correction = pidDecrease.getOutput(input);
        input += correction;
    }

    expect(Math.abs(input - target)).toBeLessThan(0.1);
});

