import { Link } from "@inertiajs/react";


export default function index({ status, message }: { status: number; message: string }) {
    return (
        <div className="flex h-screen w-full items-center justify-center text-white">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-700/50 bg-gray-800 p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold">{status}</p>
                    <span className="text-xl opacity-70">Error</span>
                </div>

                <p className="mt-2 max-w-xs text-center text-sm text-gray-300">
                    {message}
                </p>

                <Link
                    href="/"
                    className="mt-4 rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-medium hover:bg-orange-500 transition-colors"
                >
                    Go back to home
                </Link>
            </div>
        </div>
    );
}
