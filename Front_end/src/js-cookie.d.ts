declare module 'js-cookie' {
    function get(key: string): string | undefined;
    function set(key: string, value: string, options?: any): void;
    function remove(key: string, options?: any): void;
  }