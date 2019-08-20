import { ApiModelProperty } from '@nestjs/swagger';

export class AirlineDto {
    @ApiModelProperty({ description: 'id', type: String })
    public id: string;
    
    @ApiModelProperty({ description: 'nome', type: String })
    public name: string;
    
    @ApiModelProperty({ description: 'limite minimo', type: Number })
    public limitMinimum: number;
    
    @ApiModelProperty({ description: 'limite máximo', type: Number })
    public limitMaximum: number;
    
    @ApiModelProperty({ description: 'percentagem', type: Number })
    public percent: number;
    
    @ApiModelProperty({ description: 'range', type: String })
    public range: String;
    
    @ApiModelProperty({ description: 'url da photo', type: String })
    public urlPhoto: String;
    
}

// @attribute()
// rules: Array<Rules>;
