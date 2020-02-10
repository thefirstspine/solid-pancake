class Sirup {

  protected config: ISirupConfig;
  protected sessionId: string|null = null;

  bootstrap(config: ISirupConfig) {
    // Store config
    this.config = config;

    // Store in Window
    const windowRef = window || {sirup: null};
    // tslint:disable-next-line: no-string-literal
    windowRef['sirup'] = this;
  }

  async session(product, label = '', version = '') {
    this.sessionId = await this.call('session', {
      product,
      label,
      version,
    });
  }

  event(sessionId, event, category, action = '', label = '') {
    this.call('version', {
      sessionId,
      event,
      category,
      action,
      label,
    });
  }

  protected async call(endpoint, data) {
    const response: Response = await fetch(
      `${this.config.baseUrl}/endpoint`,
      {
        body: data,
        method: 'POST',
      },
    );
    return await response.text();
  }

}

interface ISirupConfig {
  baseUrl: string;
}

const baseUrl = `{baseUrl}`;

const s = new Sirup();
s.bootstrap({
  baseUrl,
});
