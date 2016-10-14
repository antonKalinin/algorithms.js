/**
 * Calculate System Input using a PID Controller
 * https://en.wikipedia.org/wiki/PID_controller
 *
 */
module.exports = class PIDController {
    /**
     * @param  {Number} kp Controller Gain Constant
     * @param  {Number} ki Controller Integration Constant
     * @param  {Number} kd Controller Derivation Constant
     * @param  {Number} dt Sampling Time (dx)
     */
    constructor(kp = 1, ki = 1, kd = 1, dt = 1) {
        this.kp = kp;
        this.ki = ki;
        this.kd = kd;

        // Interval of time between two updates
        this.dt = dt;

        this.sumError = 0;
        this.lastError = 0;

        this.target = 0;
    }

    /**
     * @param {Number} target: Desired Output of the System
     */
    setTarget(target) {
        this.target = target;
    }

    /**
     * @param  {Number} value: Measured Output of the System
     * @return {Number} Correction
     */
    getOutput(value) {
        const error = this.target - value;

        // Integration input
        this.sumError += error * this.dt;

        // Derivation input
        const derivativeError = (error - this.lastError) / this.dt;

        this.lastError = error;

        /*
            P = kp * error: accounts for present values of the error.
            For example, if the error is large and positive,
            the control output will also be large and positive.

            I = ki * integral: accounts for past values of the error.
            For example, if the current output is not sufficiently strong,
            the integral of the error will accumulate over time,
            and the controller will respond by applying a stronger action.

            D = kd * derivative: accounts for possible future trends of the error,
            based on its current rate of change
         */

        return this.kp * error + this.ki * this.sumError + this.kd * derivativeError;
    }
};
