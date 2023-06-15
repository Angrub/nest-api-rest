import {
	UserSerializedDto,
	UserWithoutCustomerSerializedDto,
} from 'src/users/dtos/users.dto';

export class SuccessLoginDto {
	user: UserSerializedDto;
	access_token: string;
}

export class MessageResponse {
	message: string;
}

export class SuccesRegister {
	user: UserWithoutCustomerSerializedDto;
	access_token: string;
}
