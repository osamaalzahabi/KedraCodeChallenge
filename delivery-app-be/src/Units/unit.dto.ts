export class CreateOrUpdateUnitDto {
    locationId: string;
    macAddress: string;
    name: string;
    capacity: number;
}

export class GetUnitDto {
    location:
        {
            id: number;
            address: string;
            macAddress: string;
        };
    macAddress: string;
    name: string;
    capacity: number;
}