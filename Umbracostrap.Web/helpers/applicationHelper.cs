using System.IO;

namespace Umbracostrap.Web.Helpers
{
	public static class ApplicationHelper
	{
        public static string GetVersion()
		{
            return string.Format("{0:yyyyMMddhhmmss}",
                File.GetLastWriteTime(System.Reflection.Assembly.GetExecutingAssembly().Location));
        }
    }
}