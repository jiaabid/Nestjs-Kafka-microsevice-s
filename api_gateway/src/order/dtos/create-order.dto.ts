import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";
export class CreateOrdertDto {
    @IsNotEmpty()
    @IsArray()
    @ApiProperty()
    products:number[]

    @IsNotEmpty()
    @ApiProperty()
    bill:string

    @IsNotEmpty()
    @ApiProperty()
    createdBy:number
}
