import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsLowercase,
  IsAlphanumeric,
  Matches,
  IsDefined,
} from 'class-validator';

export class RegisterDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  // @IsAlphanumeric()
  // @Matches(
  //   RegExp(
  //     '/(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\\.(?!\\.))){0,28}(?:[A-Za-z0-9_]))?)/g',
  //   ),
  // )
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
