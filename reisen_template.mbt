async fn main {
  let assets = @reisen.AssetStore::new()
  let audio = @reisen.AudioDom::new()

  let script : @reisen.Script[Unit] = try! @reisen.script(builder => ())

  let state = @reisen.GameState::new(())
  let render_sync = @reisen.make_pixi_render_sync_hook_from_canvas(
    "gl-canvas", assets,
  ).unwrap()
  let controller = @reisen.AppController::new(
    script,
    () => state,
    "ui-root",
    render_sync~,
  )
  @reisen.run_browser_app_loop(controller)
}