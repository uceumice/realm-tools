import { crf } from "../src";

type Args = [];

crf<Args>({}, async args => { })

crf({}, async () => { })