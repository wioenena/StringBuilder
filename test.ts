import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { StringBuilder } from "./mod.ts";

Deno.test("StringBuilder", async (t) => {
  await t.step("constructor with value", () => {
    assertEquals(new StringBuilder("Hello").toString(), "Hello");
  });

  await t.step("constructor with maxCapacity", () => {
    assertEquals(new StringBuilder(10).maxCapacity, 10);
  });

  await t.step("constructor with value and maxCapacity", () => {
    const instance = new StringBuilder("Hello", 10);
    assertEquals(instance.toString(), "Hello");
    assertEquals(instance.maxCapacity, 10);
  });

  const builder = new StringBuilder();

  await t.step("append", () => {
    builder.append("Hello"); // Hello
    builder.append(" ");
    builder.append(true); // Hello true
    builder.append(" ");
    builder.append(10); // Hello true 10
    builder.append(" ");
    builder.append(65, true); // Hello true 10 A
    builder.append(" ");
    builder.append([1, 2, 3]); // Hello true 10 A 1,2,3
    builder.append(" ");
    builder.append(new StringBuilder().appendJoin([4, 5, 6], "-")); // Hello true 10 A 1,2,3 4-5-6
    builder.append(" ");
    builder.append({ a: 1, b: 2, c: 3 }); // Hello true 10 A 1,2,3 4-5-6 [object Object]
    builder.append(" ");
    builder.append(new StringBuilder("StringBuilder")); // Hello true 10 A 1,2,3 4-5-6 [object Object] StringBuilder
    assertEquals(
      builder.toString(),
      "Hello true 10 A 1,2,3 4-5-6 [object Object] StringBuilder",
    );
  });
  builder.remove(0, builder.length);

  await t.step("appendLine", () => {
    builder.appendLine("Hello"); // Hello\n
    builder.appendLine(true); // Hello\ntrue
    builder.appendLine(10); // Hello\ntrue\n10
    builder.appendLine(65, true); // Hello\ntrue\n10\nA
    builder.appendLine([1, 2, 3]); // Hello\ntrue\n10\nA\n1,2,3
    builder.appendLine(new StringBuilder().appendJoin([4, 5, 6], "-")); // Hello\ntrue\n10\nA\n1,2,3\n4-5-6
    builder.appendLine({ a: 1, b: 2, c: 3 }); // Hello\ntrue\n10\nA\n1,2,3\n4-5-6\n[object Object]
    builder.appendLine(new StringBuilder("StringBuilder")); // Hello\ntrue\n10\nA\n1,2,3\n4-5-6\n[object Object]\nStringBuilder\n
    assertEquals(
      builder.toString(),
      "Hello\ntrue\n10\nA\n1,2,3\n4-5-6\n[object Object]\nStringBuilder\n",
    );
  });
  builder.remove(0, builder.length);

  await t.step("appendJoin", () => {
    builder.appendJoin(["Hello", "World"]); // Hello,World
    builder.append(" ");
    builder.appendJoin(["Hello", "World"], "-"); // Hello,World Hello-World
    builder.append(" ");
    builder.appendJoin([true, false]); // Hello,World Hello-World true,false
    builder.append(" ");
    builder.appendJoin([10, 20]); // Hello,World Hello-World true,false 10,20
    builder.append(" ");
    builder.appendJoin([65, 66], ",", true); // Hello,World Hello-World true,false 10,20 A,B
    builder.append(" ");
    builder.appendJoin([new StringBuilder("StringBuilder")]); // Hello,World Hello-World true,false 10,20 A,B StringBuilder
    builder.append(" ");
    builder.appendJoin([{ a: 1, b: 2, c: 3 }]); // Hello,World Hello-World true,false 10,20 A,B StringBuilder [object Object]
    assertEquals(
      builder.toString(),
      "Hello,World Hello-World true,false 10,20 A,B StringBuilder [object Object]",
    );
    builder.remove(0, builder.length);

    builder.appendJoin([
      "String",
      true,
      false,
      10,
      20,
      new StringBuilder("StringBuilder"),
      { a: 1, b: 2, c: 3 },
    ]); // String,true,false,10,20,StringBuilder,[object Object]
    assertEquals(
      builder.toString(),
      "String,true,false,10,20,StringBuilder,[object Object]",
    );
    builder.remove(0, builder.length);

    builder.appendJoin(
      [
        "String",
        true,
        false,
        65,
        66,
        new StringBuilder("StringBuilder"),
        { a: 1, b: 2, c: 3 },
      ],
      ",",
      true,
    ); // String,true,false,A,B,StringBuilder,[object Object]
    assertEquals(
      builder.toString(),
      "String,true,false,A,B,StringBuilder,[object Object]",
    );
    builder.remove(0, builder.length);

    builder.appendJoin(
      [...new Uint8Array([65, 66])],
      ",",
      true,
    );

    assertEquals(
      builder.toString(),
      "A,B",
    );
  });
  builder.remove(0, builder.length);

  await t.step("insert", () => {
    builder.append("01235689");
    builder.insert(4, "4"); // 012345689
    builder.insert(7, 7); // 0123456789
    builder.append(" ");
    builder.insert(builder.length, [10, 11, 12]); // 0123456789 10,11,12
    builder.append(" ");
    builder.insert(builder.length, new StringBuilder("StringBuilder")); // 0123456789 10,11,12 StringBuilder
    builder.append(" ");
    builder.insert(builder.length, { a: 1, b: 2, c: 3 }); // 0123456789 10,11,12 StringBuilder [object Object]
    builder.append(" ");
    builder.insert(
      builder.length,
      new StringBuilder().appendJoin([65, 66], ",", true),
    ); // 0123456789 10,11,12 StringBuilder [object Object] A,B

    assertEquals(
      builder.toString(),
      "0123456789 10,11,12 StringBuilder [object Object] A,B",
    );
  });
});
