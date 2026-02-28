///|
using @core {script}

///|
using @ui {type AudioDom}

///|
using @assets {type AssetStore}

///|
using @app {type ScriptFactory, type AppController, run_browser_app_loop}

///|
using @state {type GameState}

///|
using @presenter {make_pixi_render_sync_hook_from_canvas}

///|
async fn main {
  let assets = AssetStore::new()
  let audio = AudioDom::new_with_store(assets)

  let script_factory : ScriptFactory[Unit] = () => script(_builder => ())

  let state = GameState::new(())
  let render_sync = make_pixi_render_sync_hook_from_canvas("gl-canvas", assets).unwrap()
  let controller = AppController::new(
    script_factory,
    () => state,
    "ui-root",
    render_sync~,
    event_hook=audio.as_event_hook(),
  )
  run_browser_app_loop(controller)
}
