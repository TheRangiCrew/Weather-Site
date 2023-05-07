// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const transformData = (data: any) => {
  return {
    features: data.features.filter((feature: any) => feature.geometry != null).map((feature: any) => {
      return {
        ...feature, geometry: feature.geometry != null ? {
          ...feature.geometry, coordinates: feature.geometry.coordinates.map((coordinate: [number, number]) => {
            return coordinate.reverse()
          })
        } : null
      }
    }), updated: data.updated
  }
}

serve(async (req) => {
  const SUPABASE_URL = "https://vdktwffemhxhcaxtyvks.supabase.co"
  const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZka3R3ZmZlbWh4aGNheHR5dmtzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODM5NjQ5MSwiZXhwIjoxOTkzOTcyNDkxfQ.B81ir2dn7N9Krjei8xnqWitr0Yvmft9NtUQSgQYBtRQ"

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // Get the current time as an ISO string
  const currentTime = new Date().toISOString();

  // Build the SQL query to update the rows
  const { data: updatedData, count: updatedCount, error: updateError } = await supabase
    .from('Alerts')
    .update({ active: false }, { count: 'estimated' })
    .eq('active', true)
    .lt('expires', currentTime)

  const { data: lastPoll } = await supabase.from('AlertPollHistory').select('*').order('updated_at', { ascending: false }).limit(1)

  const request = new Request(`https://api.weather.gov/alerts/active?event=Flash%20Flood%20Warning,Lake%20Effect%20Snow%20Warning,Special%20Weather%20Statement,Special%20Marine%20Warning,Severe%20Thunderstorm%20Warning,Severe%20Thunderstorm%20Watch,Tornado%20Warning,Tornado%20Watch&limit=500`)

  const rawAlerts = await (await fetch(request)).json()

  if ((lastPoll != null ? new Date(lastPoll[0].updated_at).getTime() : new Date()) === new Date(rawAlerts.updated).getTime()) {
    console.log("\n . No Updates . \n")

    return new Response("No updates", { status: 200 })
  }

  console.log("\n > New Update < \n")

  const decoded = transformData(rawAlerts)

  const filteredData = decoded.features.map((feature: any) => {

    return {
      NWSID: feature.properties.id,
      active: new Date(feature.properties.expires).getTime() > new Date().getTime(),
      updated_at: feature.properties.sent,
      event: feature.properties.event,
      areaDesc: feature.properties.areaDesc,
      sent: feature.properties.sent,
      effective: feature.properties.effective,
      onset: feature.properties.onset,
      expires: feature.properties.expires,
      ends: feature.properties.ends,
      status: feature.properties.status,
      type: feature.properties.messageType,
      severity: feature.properties.severity,
      certainty: feature.properties.certainty,
      urgency: feature.properties.urgency,
      senderName: feature.properties.senderName,
      headline: feature.properties.headline,
      description: feature.properties.description,
      instruction: feature.properties.instruction,
      response: feature.properties.response,
      original: JSON.stringify(feature),
      geometry: JSON.stringify(feature.geometry)
    }
  })

  const { data, count, error } = await supabase.from('Alerts').upsert(filteredData, { onConflict: 'NWSID', count: "estimated" }).select();

  const { error: pollHistory } = await supabase.from('AlertPollHistory').insert({ updated_at: rawAlerts.updated, results: count, active: count, ended: updatedCount })

  return new Response(
    JSON.stringify({ count, error }),
    { headers: { "Content-Type": "application/json" }, status: error != null ? 500 : 200 },
  )
})
