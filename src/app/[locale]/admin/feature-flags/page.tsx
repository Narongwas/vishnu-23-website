import {
  getAllFeatureFlags,
  toggleFeatureFlag,
  deleteFeatureFlag,
  addNewFeatureFlag,
} from "@/app/api/v1/feature-flags/services";
import { revalidatePath } from "next/cache";

export default async function AdminDashboard() {
  // dont forget to put security check for only admin to access this page

  const flags = await getAllFeatureFlags();
  async function toggle(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await toggleFeatureFlag(id);
    revalidatePath("/admin");
  }

  async function remove(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await deleteFeatureFlag(id);
    revalidatePath("/admin");
  }

  async function add(formData: FormData) {
    "use server";
    const featureName = formData.get("featureName") as string;
    if (featureName) {
      await addNewFeatureFlag(featureName, false);
      revalidatePath("/admin");
    }
  }

  return (
    <div
      style={{
        padding: 32,
        maxWidth: 600,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px #0001",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Admin Dashboard</h1>
      <form
        action={add}
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 24,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          name="featureName"
          placeholder="Feature name"
          required
          style={{
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            flex: 1,
            minWidth: 0,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: 4,
            border: "none",
            background: "#0070f3",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Add
        </button>
      </form>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fafbfc",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 1px 4px #0001",
        }}
      >
        <thead>
          <tr style={{ background: "#f0f4f8" }}>
            <th style={{ padding: 12, textAlign: "left" }}>Feature Name</th>
            <th style={{ padding: 12 }}>Enabled</th>
            <th style={{ padding: 12 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flags.map((flag) => (
            <tr key={flag.id} style={{ borderTop: "1px solid #eee" }}>
              <td style={{ padding: 12 }}>{flag.featureName}</td>
              <td style={{ textAlign: "center" }}>
                <form action={toggle}>
                  <input type="hidden" name="id" value={flag.id} />
                  <button
                    type="submit"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    title="Toggle"
                  >
                    {flag.enabled ? "✅" : "❌"}
                  </button>
                </form>
              </td>
              <td style={{ textAlign: "center" }}>
                <form action={remove}>
                  <input type="hidden" name="id" value={flag.id} />
                  <button
                    type="submit"
                    style={{
                      padding: "6px 12px",
                      borderRadius: 4,
                      border: "none",
                      background: "#e00",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
          {flags.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: 16 }}>
                No feature flags found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
