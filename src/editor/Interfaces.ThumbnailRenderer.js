var ThumbnailRendererInterface = function (wickEditor) {

    var thumbpreview;
    var thumbRenderer;

    this.setup = function () {

        thumbpreview = document.createElement('div')
        wickEditor.project.fitScreen = false;

        thumbRenderer = new WickPixiRenderer(wickEditor.project, thumbpreview, 0.2);
        thumbRenderer.setup();

    }
    
    this.syncWithEditorState = function () {

        this.renderThumbnailForFrame(wickEditor.project.getCurrentFrame());

    }

    this.renderThumbnailForFrame = function (wickFrame) {

        if(!thumbRenderer) return;
        if(!wickFrame) return;
        //return;

        var oldObject = wickEditor.project.currentObject
        wickEditor.project.currentObject = wickFrame.parentLayer.parentWickObject;

        var oldPlayheadPosition = wickEditor.project.currentObject.playheadPosition
        wickEditor.project.currentObject.playheadPosition = wickFrame.playheadPosition;

        thumbRenderer.refresh();
        thumbRenderer.render(wickEditor.project.currentObject);
        wickFrame.thumbnail = thumbRenderer.rendererCanvas.toDataURL();

        wickEditor.project.currentObject.playheadPosition = oldPlayheadPosition;
        wickEditor.project.currentObject = oldObject;

    }

    this.cleanup = function () {
        thumbRenderer.cleanup();
    }
}