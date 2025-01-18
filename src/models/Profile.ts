import {
  ProfileAgent,
  ProfileFlags,
  ProfileLocation,
  ProfileRecord,
} from '../types/profile';

export default class Profile {
  private readonly registrationID: string;
  private readonly nationalityID: string;
  private readonly name: string;
  private readonly phoneNumber: string;
  private readonly email: string;
  private readonly location: ProfileLocation;
  private readonly agent: ProfileAgent;
  private readonly flags: ProfileFlags;

  constructor({
    registrationID,
    nationalityID,
    name,
    phoneNumber,
    email,
    location,
    agent,
    flags,
  }: ProfileRecord) {
    this.registrationID = registrationID;
    this.nationalityID = nationalityID;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.location = location;
    this.agent = agent;
    this.flags = flags;
  }

  public toJSON(): Readonly<ProfileRecord> {
    return {
      registrationID: this.registrationID,
      nationalityID: this.nationalityID,
      name: this.name,
      phoneNumber: this.phoneNumber,
      email: this.email,
      location: this.location,
      agent: this.agent,
      flags: this.flags,
    };
  }
}
