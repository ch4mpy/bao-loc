export class User {
  static readonly ANONYMOUS = new User('', '', '', '', []);

  constructor(
    readonly subject: string,
    readonly displayName: string,
    readonly email: string,
    readonly picture: string,
    readonly roles: Array<string>
  ) {}

  get isAuthenticated(): boolean {
    return !!this.subject;
  }

  static of(openIdClaims?: any): User {
    const realmRoles: string[] = openIdClaims?.realm_access?.roles || [];
    const username: string =
      openIdClaims?.preferred_username || openIdClaims?.sub || '';
    return openIdClaims?.sub
      ? new User(
          openIdClaims.sub,
          username,
          openIdClaims.email,
          openIdClaims.picture,
          realmRoles
            .map((r) => r?.trim()?.toUpperCase())
            .filter((r) => !!r?.length)
        )
      : User.ANONYMOUS;
  }
}
