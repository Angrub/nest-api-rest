import { UserSerializedDto } from 'src/users/dtos/users.dto';

export class SuccessLoginDto {
	user: UserSerializedDto;
	access_token: string;
}

export class MessageResponse {
	message: string;
}
