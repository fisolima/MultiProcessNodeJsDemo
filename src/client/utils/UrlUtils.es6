
String.prototype.replaceAll = function(target, replacement) {
    return this.split(target).join(replacement);
  };

class UrlUtils {
    static Combine() {
        if (arguments.length === 0)
            return '';

        let cleanedArgs = Array.prototype.slice.call(arguments).map((value) => value.replace(/^\/|\/$/g, ''));

        return cleanedArgs.join('/');
    }
}

export {UrlUtils};