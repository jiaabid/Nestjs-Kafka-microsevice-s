import { ApiProperty } from "@nestjs/swagger";

export class CreateOrdertDto {
    @ApiProperty()
    price:string
    @ApiProperty()
    quantity:string
    @ApiProperty()
    name:string
}
