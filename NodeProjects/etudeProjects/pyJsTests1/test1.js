import { python } from "pythonia";
import np from "numpy";
// const np = await python("numpy");
const plt = await python("matplotlib.pyplot");

const x = await np.array([1, 2, 3]);
const y = np.array([4, 1, 2]);

console.log(y);

// await plt.plot(x, y);

// await plt.title("matplotlib graph in Node.js");

// await plt.savefig("graph.png");
// python.exit();

// console.log(python);
