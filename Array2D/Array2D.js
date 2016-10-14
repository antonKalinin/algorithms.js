/**
 * Simple 2D array
 *
 * Stores all the values in a flat list.
 * Provide methods for retrieving columns and rows.
 */
module.exports = class Array2D {
    /**
     * Set the number of columns and rows and initialize an empty array
     * @param  {Number} columns
     * @param  {Number} rows
     */
    constructor(columns, rows) {
        this.columns = columns;
        this.rows = rows;

        this.array = [];
    }

    /**
     * Get item by column and row
     * @param  {Number} column
     * @param  {Number} row
     * @return {Any}
     */
    get(column, row) {
        return this.array[this.columns * row + column];
    }

    /**
     * Set item by column and row
     * @param {Number} column
     * @param {Number} row
     * @param {Any} value
     */
    set(column, row, value) {
        if (column > this.columns - 1 || row > this.rows - 1) {
            return undefined;
        }

        this.array[this.columns * row + column] = value;

        return this;
    }

    /**
     * Get the row
     * @param  {Number} row - index of the row
     * @return {Array}
     */
    getRow(row) {
        const startIndex = this.columns * row;

        return this.array.slice(startIndex, startIndex + this.columns);
    }

    /**
     * Get the column
     * @param  {Number} column - index of the column
     * @return {Array}
     */
    getColumn(column) {
        if (column > this.columns - 1) return [];

        const rowsRange = Array.from(Array(this.rows).keys());

        return rowsRange.map(row => this.array[this.columns * row + column]);
    }
};
