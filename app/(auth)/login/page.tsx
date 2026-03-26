// src/app/(auth)/login/page.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { loginSchema, type LoginInput } from "@/validations/auth.schema"

export default function LoginPage() {
  const router = useRouter()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  })

  async function onSubmit(data: LoginInput) {
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false, // tangani redirect manual
    })

    if (result?.error) {
      form.setError("root", { message: "Username atau password yang Anda masukkan salah." })
      return
    }

    router.push("/dashboard")
    router.refresh() // refresh server session
  }

  return (
    <div className="flex w-full min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-200">
      {/* Left Panel - Hidden on Mobile, shows a bespoke dark aesthetic */}
      <div className="relative hidden lg:flex lg:w-[45%] xl:w-1/2 bg-slate-950 items-center justify-center p-12 overflow-hidden">
        {/* Subtle grid & radial glow background (Signature high-end SaaS look) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mb-8 shadow-2xl">
            <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6 text-slate-200" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-5 leading-tight">
            Manage your <br/> digital portofolio.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            A meticulously crafted content management system designed for speed, security, and elegance.
          </p>
          
          <div className="mt-16 flex items-center gap-4">
             <div className="flex -space-x-3">
               {[1,2,3].map((i) => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-tr from-slate-700 to-slate-500 opacity-50" />
                 </div>
               ))}
             </div>
             <div className="text-sm font-medium text-slate-400">
               Trusted by creative professionals.
             </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-[55%] xl:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:px-24 bg-white relative">
        {/* Subtle mobile styling touches */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
           <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6 text-slate-900" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5z" />
           </svg>
           <span className="font-semibold tracking-tight text-slate-900">CMS</span>
        </div>

        <div className="w-full max-w-[400px] space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-4">
          <div className="space-y-2.5">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Enter your credentials to securely access your workspace.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              {/* Username Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-800" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    {...form.register("username")}
                    className={`w-full px-4 py-3 rounded-xl border bg-white focus:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-950/5 transition-all text-sm text-slate-900 placeholder:text-slate-400 ${
                      form.formState.errors.username ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-slate-900"
                    }`}
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                </div>
                {form.formState.errors.username && (
                  <p className="text-xs font-medium text-red-600 flex items-center gap-1.5 mt-1.5">
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-800" htmlFor="password">
                    Password
                  </label>
                  {/* Option for true SaaS feel */}
                  <a href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors" tabIndex={-1}>
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    {...form.register("password")}
                    className={`w-full px-4 py-3 rounded-xl border bg-white focus:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-950/5 transition-all text-sm text-slate-900 placeholder:text-slate-400 tracking-wide ${
                      form.formState.errors.password ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-slate-900"
                    }`}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs font-medium text-red-600 flex items-center gap-1.5 mt-1.5">
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Error feedback */}
            {form.formState.errors.root && (
              <div className="p-3.5 bg-red-50/80 border border-red-100 rounded-xl flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300">
                 <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                 <p className="text-sm font-medium text-red-800 leading-snug">{form.formState.errors.root.message}</p>
              </div>
            )}

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={form.formState.isSubmitting}
                className="w-full bg-slate-950 text-white font-medium py-3 rounded-xl hover:bg-slate-800 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-slate-950/10 disabled:bg-slate-950/60 disabled:cursor-not-allowed disabled:active:scale-100 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  "Sign in to workspace"
                )}
              </button>
            </div>
          </form>
          
          {/* Subtle footer area */}
          <div className="text-center pt-6">
            <p className="text-[13px] text-slate-400">
              Secured with AES-256 Encryption & Edge Middleware
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}