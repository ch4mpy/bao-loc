/// <reference lib="webworker" />

import { Solution } from "@c4-soft/bao-loc-domain";

addEventListener('message', ({data}) => {
  const solutions: Solution[] = []
  Solution.explore([1, 2, 3, 4, 5, 6, 7, 8, 9], [], solutions)
  postMessage(solutions);
});
