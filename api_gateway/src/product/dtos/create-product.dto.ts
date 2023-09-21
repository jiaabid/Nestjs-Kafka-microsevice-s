import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class CreateProductDto {
    @IsNotEmpty()
    @ApiProperty()
    price:string

    @IsNotEmpty()
    @ApiProperty()
    quantity:string

    @IsNotEmpty()
    @ApiProperty()
    name:string
}
