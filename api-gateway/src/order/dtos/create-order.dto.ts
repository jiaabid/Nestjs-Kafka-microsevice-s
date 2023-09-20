import { ApiProperty } from "@nestjs/swagger";

export class CreateOrdertDto {
    @ApiProperty()
    products:number[]
    @ApiProperty()
    bill:string
    @ApiProperty()
    createdBy:number
}
