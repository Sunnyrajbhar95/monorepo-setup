class extractpublicid {
  static publicIdExtractor(url: string): string | undefined {
    if (!url) {
      return undefined;
    }
    const parts = url.split("/upload/")[1];
    const withoutVersion = parts?.replace(/^v\d+\//, "");
    return withoutVersion?.substring(0, withoutVersion.lastIndexOf("."));
  }
}
export default extractpublicid;
