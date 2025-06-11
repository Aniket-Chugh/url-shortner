import { BarChart3, Eye, Calendar, Globe } from 'lucide-react'

const Analytics = ({ shortenedUrls = [] }) => {
  if (!shortenedUrls || shortenedUrls.length === 0) return null;

  const totalClicks = shortenedUrls.reduce(
    (sum, url) => sum + (url.clicks || 0),
    0
  );

  const protectedLinks = shortenedUrls.filter(url => url.isProtected).length;

  return (
    <section id="analytics" className="max-w-6xl mx-auto mb-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Link Analytics</h3>
        <p className="text-gray-600">Track performance and engagement of your shortened URLs</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200/50 hover-lift">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Globe className="w-6 h-6 text-primary-600" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">{shortenedUrls.length}</h4>
          <p className="text-gray-600">Total Links</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200/50 hover-lift">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Eye className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">{totalClicks}</h4>
          <p className="text-gray-600">Total Clicks</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200/50 hover-lift">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-red-600" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">{protectedLinks}</h4>
          <p className="text-gray-600">Protected Links</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200/50 hover-lift">
          <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-accent-600" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">
            {shortenedUrls.length > 0 ? Math.round(totalClicks / shortenedUrls.length) : 0}
          </h4>
          <p className="text-gray-600">Avg. Clicks</p>
        </div>
      </div>

      {/* Recent Links Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden">
        <div className="p-6 border-b border-gray-200/50">
          <h4 className="text-xl font-semibold text-gray-900">Recent Links</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Short URL</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Original URL</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Clicks</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Created</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {shortenedUrls.slice(0, 5).map((url, index) => (
                <tr key={url.id || index} className="border-t border-gray-200/50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-mono text-primary-600 text-sm">{url.shortUrl}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">{url.originalUrl}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{url.clicks}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-1">
                      {url.isProtected && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Protected</span>
                      )}
                      {url.expirationDate && (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">Expires</span>
                      )}
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
