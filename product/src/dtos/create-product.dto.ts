export class CreateProductDto {
  constructor(
    public readonly name: string,
    public readonly quantity: string,
    public readonly price: string,
  ) {}
}
