const Array2D = require('./Array2D');
const columns = 3;
const rows = 4;
const map = new Array2D(columns, rows);

for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
        map.set(x, y, x + y);
    }
}

test('get setted value', () => {
    map.set(1, 1, 3);

    expect(map.get(1, 1)).toBe(3);
});

test('get value that out from range', () => {
    expect(map.get(99, 1)).toBe(undefined);
});

test('get existing row', () => {
    expect(map.getRow(2)).toEqual([2, 3, 4]);
});

test('get non existing row', () => {
    expect(map.getRow(13)).toEqual([]);
});

test('get existing column', () => {
    expect(map.getColumn(2)).toEqual([2, 3, 4, 5]);
});

test('get non existing column', () => {
    expect(map.getColumn(49)).toEqual([]);
});
