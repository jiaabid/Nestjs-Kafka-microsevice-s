import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    price:string
    @ApiProperty()
    quantity:string
    @ApiProperty()
    name:string
}
