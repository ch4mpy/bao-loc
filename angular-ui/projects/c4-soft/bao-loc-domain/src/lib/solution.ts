export class Solution {
  constructor(
    public x1: number,
    public x2: number,
    public x3: number,
    public x4: number,
    public x5: number,
    public x6: number,
    public x7: number,
    public x8: number,
    public x9: number
  ) {}

  get value(): number {
    return (
      this.x1 +
      (13 * this.x2) / this.x3 +
      this.x4 +
      12 * this.x5 -
      this.x6 -
      11 +
      (this.x7 * this.x8) / this.x9 -
      10
    );
  }

  get isValid(): boolean {
    return 66 === this.value;
  }

  static explore(
    possibilities: number[],
    elements: number[],
    validSolutions: Solution[]
  ) {
    if (possibilities.length > 1) {
      possibilities.forEach((picked) => {
        const el = Object.assign([], elements);
        el.push(picked);
        const remaining = possibilities.filter((x) => x != picked);
        Solution.explore(remaining, el, validSolutions);
      });
    } else {
      const solution = new Solution(
        elements[0],
        elements[1],
        elements[2],
        elements[3],
        elements[4],
        elements[5],
        elements[6],
        elements[7],
        possibilities[0]
      );
      if (solution.isValid) {
        validSolutions.push(solution);
      }
    }
  }
}
