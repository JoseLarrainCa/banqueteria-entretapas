import { describe, expect, it } from "vitest";
import { cortarRango } from "../worker/index";

// Safari de iPhone no reproduce un video si el servidor no contesta 206 a un Range.
describe("cortarRango", () => {
  it("sin Range se sirve entero", () => expect(cortarRango(null, 100)).toBeNull());
  it("el primer pedido de Safari (0-1)", () => expect(cortarRango("bytes=0-1", 100)).toEqual({ inicio: 0, fin: 1 }));
  it("abierto al final", () => expect(cortarRango("bytes=10-", 100)).toEqual({ inicio: 10, fin: 99 }));
  it("los últimos N bytes", () => expect(cortarRango("bytes=-20", 100)).toEqual({ inicio: 80, fin: 99 }));
  it("un fin pasado del largo se recorta", () => expect(cortarRango("bytes=90-500", 100)).toEqual({ inicio: 90, fin: 99 }));
  it("fuera del archivo da 416", () => expect(cortarRango("bytes=200-300", 100)).toBe("fuera"));
  it("basura se ignora", () => expect(cortarRango("items=0-1", 100)).toBeNull());
});
