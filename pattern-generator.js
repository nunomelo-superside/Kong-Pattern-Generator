      const IMAGE_MODE_FRAME_WIDTH = 330;
      const IMAGE_MODE_FRAME_HEIGHT = 370;
      const IMAGE_MODE_DEFAULT_ZOOM = 2;
      const IMAGE_DENSITY_BASELINE = 2.2;
      const TEXTURE_PATTERN_DEFAULTS = {
        spacing: 14,
        minDot: 0.4,
        dotScale: 1,
        strokeWidth: 1.6,
        strokeTaper: 0.95,
        sizeCurve: 1,
        sizeCutoff: 0.8,
        brushFlow: 0.25,
        flowResponse: 2,
      };
      const IMAGE_PATTERN_DEFAULTS = {
        spacing: 10,
        minDot: 0.9,
        dotScale: 1.5,
        strokeWidth: 2,
        strokeTaper: 0.95,
        sizeCurve: 1.2,
        sizeCutoff: 0.9,
        brushFlow: 0.25,
        flowResponse: 2,
      };

      const paintCanvas = document.getElementById("paintCanvas");
      const paintCtx = paintCanvas.getContext("2d", { willReadFrequently: true });
      const layerCanvases = {
        front: document.createElement("canvas"),
        back: document.createElement("canvas"),
      };
      const layerContexts = {
        front: layerCanvases.front.getContext("2d", { willReadFrequently: true }),
        back: layerCanvases.back.getContext("2d", { willReadFrequently: true }),
      };
      const frontSvgPreview = document.getElementById("frontSvgPreview");
      const backSvgPreview = document.getElementById("backSvgPreview");
      const canvasStatus = document.getElementById("canvasStatus");
      const overlayWrap = document.querySelector(".overlay-wrap");
      const overlayStage = document.querySelector(".overlay-stage");
      const cursorRing = document.getElementById("cursorRing");
      const cursorFill = document.getElementById("cursorFill");
      const cursorReadout = document.getElementById("cursorReadout");
      const referenceImage = document.getElementById("referenceImage");
      const imageTransformBounds = document.getElementById("imageTransformBounds");
      const imageHandleNW = document.getElementById("imageHandleNW");
      const imageHandleN = document.getElementById("imageHandleN");
      const imageHandleNE = document.getElementById("imageHandleNE");
      const imageHandleE = document.getElementById("imageHandleE");
      const imageHandleSW = document.getElementById("imageHandleSW");
      const imageHandleS = document.getElementById("imageHandleS");
      const imageHandleSE = document.getElementById("imageHandleSE");
      const imageHandleW = document.getElementById("imageHandleW");
      const zoomShell = document.getElementById("zoomShell");
      const generatorModeSelect = document.getElementById("generatorModeSelect");

      const referenceImageInput = document.getElementById("referenceImageInput");
      const imageControlRow = document.getElementById("imageControlRow");
      const imageOpacityRow = document.getElementById("imageOpacityRow");
      const imageOpacityInput = document.getElementById("imageOpacityInput");
      const imageOpacityValue = document.getElementById("imageOpacityValue");
      const fitImageButton = document.getElementById("fitImageButton");
      const clearImageButton = document.getElementById("clearImageButton");
      const chooseImageButton = document.getElementById("chooseImageButton");
      const replaceImageButton = document.getElementById("replaceImageButton");
      const widthScrubHandle = document.getElementById("widthScrubHandle");
      const heightScrubHandle = document.getElementById("heightScrubHandle");
      const widthInput = document.getElementById("widthInput");
      const heightInput = document.getElementById("heightInput");
      const resizeButton = document.getElementById("resizeButton");
      const projectNameInput = document.getElementById("projectNameInput");
      const frontLayerVisibilityButton = document.getElementById("frontLayerVisibilityButton");
      const frontLayerVisibilityIcon = document.getElementById("frontLayerVisibilityIcon");
      const imageLayerVisibilityButton = document.getElementById("imageLayerVisibilityButton");
      const imageLayerVisibilityIcon = document.getElementById("imageLayerVisibilityIcon");
      const imageLayerExpandButton = null;
      const backLayerVisibilityButton = document.getElementById("backLayerVisibilityButton");
      const backLayerVisibilityIcon = document.getElementById("backLayerVisibilityIcon");
      const imageLayerChildren = null;
      const frontLayerDeleteButton = document.getElementById("frontLayerDeleteButton");
      const backLayerDeleteButton = document.getElementById("backLayerDeleteButton");
      const imageNameLabel = document.getElementById("imageNameLabel");

      const frontLayerButton = document.getElementById("frontLayerButton");
      const backLayerButton = document.getElementById("backLayerButton");
      const paintModeButton = document.getElementById("paintModeButton");
      const eraseModeButton = document.getElementById("eraseModeButton");
      const moveModeButton = document.getElementById("moveModeButton");
      const zoomModeButton = document.getElementById("zoomModeButton");
      const zoomHundredButton = document.getElementById("zoomHundredButton");
      const zoomFitButton = document.getElementById("zoomFitButton");
      const zoomOutButton = document.getElementById("zoomOutButton");
      const zoomInButton = document.getElementById("zoomInButton");
      const overlayToggleVisibleButton = document.getElementById("overlayToggleVisibleButton");
      const overlayToggleButton = document.getElementById("overlayToggleButton");
      const brushSizeInput = document.getElementById("brushSizeInput");
      const brushHardnessInput = document.getElementById("brushStrengthInput");
      const brushFlowInput = document.getElementById("brushFlowInput");
      const alignedGridButton = document.getElementById("alignedGridButton");
      const staggeredGridButton = document.getElementById("staggeredGridButton");
      const spacingInput = document.getElementById("spacingInput");
      const minDotInput = document.getElementById("minDotInput");
      const dotScaleInput = document.getElementById("dotScaleInput");
      const strokeWidthInput = document.getElementById("strokeWidthInput");
      const strokeTaperInput = document.getElementById("strokeTaperInput");
      const sizeCurveInput = document.getElementById("sizeCurveInput");
      const sizeCutoffInput = document.getElementById("sizeCutoffInput");
      const dotColorInput = document.getElementById("dotColorInput");
      const flowResponseInput = document.getElementById("flowResponseInput");
      const zoomInput = document.getElementById("zoomInput");

      const brushSizeValue = document.getElementById("brushSizeValue");
      const brushHardnessValue = document.getElementById("brushStrengthValue");
      const brushFlowValue = document.getElementById("brushFlowValue");
      const spacingValue = document.getElementById("spacingValue");
      const minDotValue = document.getElementById("minDotValue");
      const dotScaleValue = document.getElementById("dotScaleValue");
      const strokeWidthValue = document.getElementById("strokeWidthValue");
      const strokeTaperValue = document.getElementById("strokeTaperValue");
      const sizeCurveValue = document.getElementById("sizeCurveValue");
      const sizeCutoffValue = document.getElementById("sizeCutoffValue");
      const flowResponseValue = document.getElementById("flowResponseValue");
      const zoomValue = document.getElementById("zoomValue");
      const zoomStatusValue = document.getElementById("zoomStatusValue");
      const dotColorVisible = document.getElementById("dotColorVisible");
      const dotColorSwatch = document.getElementById("dotColorSwatch");

      const clearButton = document.getElementById("clearButton");
      const downloadFrontButton = document.getElementById("downloadFrontButton");
      const downloadBackButton = document.getElementById("downloadBackButton");
      const downloadBothButton = document.getElementById("downloadBothButton");
      const topCopyButton = document.getElementById("topCopyButton");
      const bottomCopyButton = document.getElementById("bottomCopyButton");
      const saveProjectButton = document.getElementById("saveProjectButton");
      const loadProjectVisibleButton = document.getElementById("loadProjectVisibleButton");
      const loadImageProjectVisibleButton = document.getElementById("loadImageProjectVisibleButton");
      const loadProjectButton = document.getElementById("loadProjectButton");
      const loadProjectInput = document.getElementById("loadProjectInput");
      const loadImageProjectInput = document.getElementById("loadImageProjectInput");
      const copyButton = document.getElementById("copyButton");
      const shortcutHelpButton = document.getElementById("shortcutHelpButton");
      const patternSettingsSection = document.getElementById("patternSettingsSection");
      const fitScreenButton = document.getElementById("fitScreenButton");
      const undoButton = document.getElementById("undoButton");
      const redoButton = document.getElementById("redoButton");
      const markCountStatus = document.getElementById("markCountStatus");
      const shortcutDialog = document.getElementById("shortcutDialog");
      const shortcutDialogCloseButton = document.getElementById("shortcutDialogCloseButton");
      const imageImportDialog = document.getElementById("imageImportDialog");
      const imageImportDialogMessage = document.getElementById("imageImportDialogMessage");
      const modeSwitchDialog = document.getElementById("modeSwitchDialog");
      const modeSwitchDialogMessage = document.getElementById("modeSwitchDialogMessage");
      const layerDeleteDialog = document.getElementById("layerDeleteDialog");
      const layerDeleteDialogMessage = document.getElementById("layerDeleteDialogMessage");
      const imageImportKeepButton = document.getElementById("imageImportKeepButton");
      const imageImportDeleteButton = document.getElementById("imageImportDeleteButton");
      const imageImportCancelButton = document.getElementById("imageImportCancelButton");
      const modeSwitchCancelButton = document.getElementById("modeSwitchCancelButton");
      const modeSwitchContinueButton = document.getElementById("modeSwitchContinueButton");
      const layerDeleteCancelButton = document.getElementById("layerDeleteCancelButton");
      const layerDeleteConfirmButton = document.getElementById("layerDeleteConfirmButton");
      const appTooltip = document.getElementById("appTooltip");
      const appTooltipLabel = document.getElementById("appTooltipLabel");
      const imageLayerRow = imageControlRow;
      const imageAdjustmentsSection = document.getElementById("imageAdjustmentsSection");
      const zoomToolbarShell = document.querySelector(".zoom-toolbar-shell");
      const floatingToolbarShell = document.querySelector(".floating-toolbar-shell");
      const floatingToolbar = document.querySelector(".floating-toolbar");
      const floatingControls = document.querySelector(".floating-controls");
      const imageBrightnessInput = document.getElementById("imageBrightnessInput");
      const imageContrastInput = document.getElementById("imageContrastInput");
      const imageGammaInput = document.getElementById("imageGammaInput");
      const imageCutoffInput = document.getElementById("imageCutoffInput");
      const imageDensityInput = document.getElementById("imageDensityInput");
      const imageScaleInput = document.getElementById("imageScaleInput");
      const imageBrightnessValue = document.getElementById("imageBrightnessValue");
      const imageContrastValue = document.getElementById("imageContrastValue");
      const imageGammaValue = document.getElementById("imageGammaValue");
      const imageCutoffValue = document.getElementById("imageCutoffValue");
      const imageDensityValue = document.getElementById("imageDensityValue");
      const imageScaleValue = document.getElementById("imageScaleValue");

      const state = {
        activeLayer: "front",
        generatorMode: "image",
        mode: "paint",
        lastPaintEraseMode: "paint",
        drawing: false,
        movingPattern: false,
        adjustingBrush: false,
        panKeyDown: false,
        panning: false,
        showOverlay: false,
        brushSize: Number(brushSizeInput.value),
        brushHardness: Number(brushHardnessInput.value) / 100,
        brushFlow: IMAGE_PATTERN_DEFAULTS.brushFlow,
        toolSettings: {
          paint: {
            size: Number(brushSizeInput.value),
            hardness: Number(brushHardnessInput.value) / 100,
          },
          erase: {
            size: Number(brushSizeInput.value),
            hardness: Number(brushHardnessInput.value) / 100,
          },
        },
        gridMode: "staggered",
        spacing: IMAGE_PATTERN_DEFAULTS.spacing,
        minDot: IMAGE_PATTERN_DEFAULTS.minDot,
        dotScale: IMAGE_PATTERN_DEFAULTS.dotScale,
        strokeWidth: IMAGE_PATTERN_DEFAULTS.strokeWidth,
        strokeTaper: IMAGE_PATTERN_DEFAULTS.strokeTaper,
        sizeCurve: IMAGE_PATTERN_DEFAULTS.sizeCurve,
        sizeCutoff: IMAGE_PATTERN_DEFAULTS.sizeCutoff,
        dotColor: dotColorInput.value,
        flowResponse: IMAGE_PATTERN_DEFAULTS.flowResponse,
        zoom: Number(zoomInput.value) / 100,
        lastPoint: null,
        pendingRender: false,
        latestSvgs: {
          front: "",
          back: "",
        },
        latestCounts: {
          front: 0,
          back: 0,
        },
        layerHasContent: {
          front: false,
          back: false,
        },
        referenceImageUrl: "",
        referenceImageWidth: 0,
        referenceImageHeight: 0,
        referenceImageName: "",
        referenceImageOpacity: Number(imageOpacityInput.value) / 100,
        projectName: projectNameInput.value.trim() || "Untitled project",
        layerVisibility: {
          front: true,
          image: false,
          back: true,
        },
        layerOpacity: {
          front: 1,
          image: Number(imageOpacityInput.value) / 100,
          back: 1,
        },
        layerExpanded: {
          front: false,
          image: false,
          back: true,
        },
        brushAdjustStartX: 0,
        brushAdjustStartY: 0,
        brushAdjustAnchorX: 0,
        brushAdjustAnchorY: 0,
        brushAdjustInitialSize: Number(brushSizeInput.value),
        brushAdjustInitialHardness: Number(brushHardnessInput.value) / 100,
        viewOffsetX: 0,
        viewOffsetY: 0,
        panStartX: 0,
        panStartY: 0,
        panInitialOffsetX: 0,
        panInitialOffsetY: 0,
        patternMoveStartX: 0,
        patternMoveStartY: 0,
        patternMoveDeltaX: 0,
        patternMoveDeltaY: 0,
        patternMoveSnapshots: null,
        history: [],
        redoHistory: [],
        maxHistory: 40,
        pointerInsideCanvas: false,
        pointerClientX: 0,
        pointerClientY: 0,
        resizeDebounceId: 0,
        resizeDebounceMode: "",
        imageGenerationDebounceId: 0,
        imageGenerationSequence: 0,
        tooltipTarget: null,
        tooltipTimerId: 0,
        tooltipHideTimerId: 0,
        sizeScrub: null,
        imageDragging: false,
        imageDragStartX: 0,
        imageDragStartY: 0,
        imageDragInitialOffsetX: 0,
        imageDragInitialOffsetY: 0,
        imageScaling: null,
        imageTransformVisible: false,
        patternSettingsByMode: {
          texture: { ...TEXTURE_PATTERN_DEFAULTS },
          image: { ...IMAGE_PATTERN_DEFAULTS },
        },
        imageGenerator: {
          brightness: Number(imageBrightnessInput.value) / 100,
          contrast: Number(imageContrastInput.value) / 100,
          gamma: Number(imageGammaInput.value) / 100,
          cutoff: Number(imageCutoffInput.value) / 100,
          density: IMAGE_DENSITY_BASELINE,
          imageScale: Number(imageScaleInput.value) / 100,
          offsetX: 0,
          offsetY: 0,
        },
      };

      function clampBrushSize(value) {
        return Math.max(2, Math.min(180, value));
      }

      function clampBrushHardness(value) {
        return Math.max(0.01, Math.min(1, value));
      }

      function clampBrushFlow(value) {
        return Math.max(0.01, Math.min(1, value));
      }

      function clampFlowResponse(value) {
        return Math.max(0.2, Math.min(3, value));
      }

      function clampImageGamma(value) {
        return Math.max(0.2, Math.min(3, value));
      }

      function clampImageCutoff(value) {
        return Math.max(0.5, Math.min(1, value));
      }

      function clampImageDensity(value) {
        return Math.max(0.4, Math.min(4.4, value));
      }

      function imageDensityToPercent(value) {
        return (clampImageDensity(value) / IMAGE_DENSITY_BASELINE) * 100;
      }

      function imageDensityFromPercent(value) {
        return clampImageDensity((value / 100) * IMAGE_DENSITY_BASELINE);
      }

      function clampImageScale(value) {
        return Math.max(0.1, Math.min(3, value));
      }

      function clampZoom(value) {
        return Math.max(0.25, Math.min(4, value));
      }

      function snapZoomToTenth(value) {
        return Math.round(value * 10) / 10;
      }

      function setBrushSize(value) {
        state.brushSize = Math.round(clampBrushSize(value));
        state.toolSettings[state.mode].size = state.brushSize;
        updateLabels();
      }

      function setBrushHardness(value) {
        state.brushHardness = clampBrushHardness(value);
        state.toolSettings[state.mode].hardness = state.brushHardness;
        updateLabels();
      }

      function setBrushFlow(value) {
        state.brushFlow = clampBrushFlow(value);
        updateLabels();
      }

      function setFlowResponse(value) {
        state.flowResponse = clampFlowResponse(value);
        updateLabels();
      }

      function getCurrentPatternSettings() {
        return {
          spacing: state.spacing,
          minDot: state.minDot,
          dotScale: state.dotScale,
          strokeWidth: state.strokeWidth,
          strokeTaper: state.strokeTaper,
          sizeCurve: state.sizeCurve,
          sizeCutoff: state.sizeCutoff,
          brushFlow: state.brushFlow,
          flowResponse: state.flowResponse,
        };
      }

      function syncCurrentModePatternSettings() {
        state.patternSettingsByMode[state.generatorMode] = getCurrentPatternSettings();
      }

      function applyPatternSettings(settings) {
        state.spacing = settings.spacing;
        state.minDot = settings.minDot;
        state.dotScale = settings.dotScale;
        state.strokeWidth = settings.strokeWidth;
        state.strokeTaper = settings.strokeTaper;
        state.sizeCurve = settings.sizeCurve;
        state.sizeCutoff = settings.sizeCutoff;
        state.brushFlow = settings.brushFlow;
        state.flowResponse = settings.flowResponse;
      }

      function setGeneratorMode(nextMode) {
        if (nextMode !== "texture" && nextMode !== "image") {
          return;
        }
        const previousMode = state.generatorMode;
        if (previousMode === "texture" || previousMode === "image") {
          syncCurrentModePatternSettings();
        }
        state.generatorMode = nextMode;
        applyPatternSettings(state.patternSettingsByMode[nextMode]);
        document.body.dataset.generatorMode = nextMode;
        generatorModeSelect.value = nextMode;
        if (nextMode === "image") {
          if (
            previousMode !== "image" ||
            paintCanvas.width !== IMAGE_MODE_FRAME_WIDTH ||
            paintCanvas.height !== IMAGE_MODE_FRAME_HEIGHT
          ) {
            resizeCanvasPreserveContent(IMAGE_MODE_FRAME_WIDTH, IMAGE_MODE_FRAME_HEIGHT);
          }
          state.zoom = IMAGE_MODE_DEFAULT_ZOOM;
          centerViewport();
          state.activeLayer = "front";
          state.showOverlay = false;
          state.imageTransformVisible = Boolean(state.referenceImageUrl);
          hideCursorRing();
          scheduleImageGeneration(true);
        } else {
          scheduleRender();
          if (state.pointerInsideCanvas && (state.mode === "paint" || state.mode === "erase")) {
          showCursorRing({
            clientX: state.pointerClientX,
            clientY: state.pointerClientY,
          });
          }
        }
        updateToggleButtons();
        updateLabels();
        updatePanCursor();
      }

      function switchMode(nextMode) {
        if (nextMode !== "paint" && nextMode !== "erase" && nextMode !== "move" && nextMode !== "zoom") {
          return;
        }
        const previousMode = state.mode;
        state.mode = nextMode;
        if (nextMode === "paint" || nextMode === "erase") {
          state.lastPaintEraseMode = nextMode;
        }
        if (
          (previousMode === "move" || previousMode === "zoom") !==
          (nextMode === "move" || nextMode === "zoom")
        ) {
          setFloatingToolbarVisibility(nextMode === "move" || nextMode === "zoom");
        }
        if (previousMode === "zoom" || nextMode === "zoom") {
          setZoomToolbarVisibility(nextMode !== "zoom");
        }
        if (nextMode === "move" || nextMode === "zoom") {
          updateToggleButtons();
          updatePanCursor();
          hideCursorRing();
          return;
        }
        const nextSettings = state.toolSettings[nextMode];
        state.brushSize = Math.round(clampBrushSize(nextSettings.size));
        state.brushHardness = clampBrushHardness(nextSettings.hardness);
        updateToggleButtons();
        updatePanCursor();
        updateLabels();
        if (state.pointerInsideCanvas) {
          showCursorRing({
            clientX: state.pointerClientX,
            clientY: state.pointerClientY,
          });
        }
      }

      function setLayerOpacity(layerName, value) {
        const nextOpacity = Math.max(0, Math.min(1, value));
        state.layerOpacity[layerName] = nextOpacity;
        if (layerName === "image") {
          state.referenceImageOpacity = nextOpacity;
        }
        updateLabels();
      }

      function toggleLayerVisibility(layerName) {
        if (layerName === "image" && !state.referenceImageUrl) {
          return;
        }
        state.layerVisibility[layerName] = !state.layerVisibility[layerName];
        updateToggleButtons();
        updateLabels();
      }

      function toggleLayerExpanded(layerName) {
        state.layerExpanded[layerName] = !state.layerExpanded[layerName];
        updateToggleButtons();
      }

      function setZoom(value) {
        state.zoom = clampZoom(snapZoomToTenth(value));
        updateLabels();
      }

      function updateViewportTransform() {
        zoomShell.style.transform = `translate(calc(-50% + ${Math.round(
          state.viewOffsetX
        )}px), calc(-50% + ${Math.round(state.viewOffsetY)}px)) scale(${state.zoom})`;
        zoomShell.style.left = "50%";
        zoomShell.style.top = "50%";
        zoomShell.style.marginLeft = "0";
        zoomShell.style.marginTop = "0";
        invalidateSvgPreview();
      }

      function invalidateSvgPreview() {
        zoomShell.style.willChange = "auto";
        frontSvgPreview.style.webkitTransform = "translateZ(0)";
        backSvgPreview.style.webkitTransform = "translateZ(0)";
        void zoomShell.offsetHeight;
        requestAnimationFrame(() => {
          frontSvgPreview.style.webkitTransform = "";
          backSvgPreview.style.webkitTransform = "";
        });
      }

      function centerViewport() {
        state.viewOffsetX = 0;
        state.viewOffsetY = 0;
        updateViewportTransform();
      }

      function resetView() {
        state.zoom = state.generatorMode === "image" ? IMAGE_MODE_DEFAULT_ZOOM : 1;
        centerViewport();
        updateLabels();
      }

      function fitZoomToWorkspace() {
        const padding = 64;
        const availableWidth = Math.max(64, overlayWrap.clientWidth - padding);
        const availableHeight = Math.max(64, overlayWrap.clientHeight - padding);
        const nextZoom = Math.min(
          availableWidth / Math.max(1, paintCanvas.width),
          availableHeight / Math.max(1, paintCanvas.height)
        );
        state.zoom = clampZoom(snapZoomToTenth(nextZoom));
        centerViewport();
        updateLabels();
      }

      function getImagePlacementRect() {
        const frameWidth = paintCanvas.width;
        const frameHeight = paintCanvas.height;
        const imageWidth = state.referenceImageWidth;
        const imageHeight = state.referenceImageHeight;

        if (!imageWidth || !imageHeight) {
          return {
            x: 0,
            y: 0,
            width: frameWidth,
            height: frameHeight,
            maxOffsetX: 0,
            maxOffsetY: 0,
          };
        }

        const coverScale = Math.max(frameWidth / imageWidth, frameHeight / imageHeight);
        const renderedWidth = imageWidth * coverScale * state.imageGenerator.imageScale;
        const renderedHeight = imageHeight * coverScale * state.imageGenerator.imageScale;
        const offsetX = state.imageGenerator.offsetX;
        const offsetY = state.imageGenerator.offsetY;

        return {
          x: (frameWidth - renderedWidth) * 0.5 + offsetX,
          y: (frameHeight - renderedHeight) * 0.5 + offsetY,
          width: renderedWidth,
          height: renderedHeight,
          maxOffsetX: Number.POSITIVE_INFINITY,
          maxOffsetY: Number.POSITIVE_INFINITY,
        };
      }

      function resetImagePlacement() {
        state.imageGenerator.imageScale = 1;
        state.imageGenerator.offsetX = 0;
        state.imageGenerator.offsetY = 0;
      }

      function updateImageTransformOverlay() {
        const shouldShow =
          state.generatorMode === "image" &&
          Boolean(state.referenceImageUrl) &&
          state.imageTransformVisible;
        imageTransformBounds.classList.toggle("is-hidden", !shouldShow);
        if (!shouldShow) {
          return;
        }

        const placement = getImagePlacementRect();
        imageTransformBounds.style.left = `${placement.x}px`;
        imageTransformBounds.style.top = `${placement.y}px`;
        imageTransformBounds.style.width = `${placement.width}px`;
        imageTransformBounds.style.height = `${placement.height}px`;
      }

      function updateReferenceImageTransform() {
        const placement = getImagePlacementRect();
        referenceImage.style.left = `${placement.x}px`;
        referenceImage.style.top = `${placement.y}px`;
        referenceImage.style.width = `${placement.width}px`;
        referenceImage.style.height = `${placement.height}px`;
        updateImageTransformOverlay();
      }

      function nudgeReferenceImage(deltaX, deltaY) {
        if (state.generatorMode !== "image" || !state.referenceImageUrl || !state.imageTransformVisible) {
          return false;
        }
        state.imageGenerator.offsetX += deltaX;
        state.imageGenerator.offsetY += deltaY;
        updateReferenceImageTransform();
        scheduleImageGeneration();
        return true;
      }

      function beginImageScale(corner, event) {
        if (!state.referenceImageUrl || event.button !== 0) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        const handleElement = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
        if (handleElement && typeof event.pointerId === "number") {
          handleElement.setPointerCapture(event.pointerId);
        }
        const placement = getImagePlacementRect();
        const stageRect = overlayStage.getBoundingClientRect();
        const isWest = corner === "nw" || corner === "sw";
        const isNorth = corner === "nw" || corner === "ne";
        const isHorizontalEdge = corner === "e" || corner === "w";
        const isVerticalEdge = corner === "n" || corner === "s";
        const scaleX = paintCanvas.width / Math.max(1, stageRect.width);
        const scaleY = paintCanvas.height / Math.max(1, stageRect.height);
        const oppositeX =
          corner === "w" || isWest ? placement.x + placement.width : placement.x;
        const oppositeY =
          corner === "n" || isNorth ? placement.y + placement.height : placement.y;

        state.imageScaling = {
          corner,
          isWest,
          isNorth,
          isHorizontalEdge,
          isVerticalEdge,
          startRectLeft: placement.x,
          startRectTop: placement.y,
          startRectWidth: placement.width,
          startRectHeight: placement.height,
          startCenterX: placement.x + placement.width * 0.5,
          startCenterY: placement.y + placement.height * 0.5,
          oppositeX,
          oppositeY,
          stageLeft: stageRect.left,
          stageTop: stageRect.top,
          scaleX,
          scaleY,
          startScale: state.imageGenerator.imageScale,
          startOffsetX: state.imageGenerator.offsetX,
          startOffsetY: state.imageGenerator.offsetY,
          pointerId: typeof event.pointerId === "number" ? event.pointerId : null,
          handleElement,
        };
        document.body.classList.add("is-scrubbing-size");
      }

      function updateImageScale(event) {
        if (!state.imageScaling) {
          return;
        }
        const localX = (event.clientX - state.imageScaling.stageLeft) * state.imageScaling.scaleX;
        const localY = (event.clientY - state.imageScaling.stageTop) * state.imageScaling.scaleY;
        const preserveCenter = event.altKey;
        const aspect =
          state.imageScaling.startRectHeight <= 0
            ? 1
            : state.imageScaling.startRectWidth / state.imageScaling.startRectHeight;

        let nextWidth;
        let nextHeight;
        let nextLeft;
        let nextTop;

        if (preserveCenter) {
          if (state.imageScaling.isHorizontalEdge) {
            const halfWidthFromCursor = Math.max(
              1,
              state.imageScaling.corner === "w"
                ? state.imageScaling.startCenterX - localX
                : localX - state.imageScaling.startCenterX
            );
            nextWidth = halfWidthFromCursor * 2;
            nextHeight = nextWidth / aspect;
          } else if (state.imageScaling.isVerticalEdge) {
            const halfHeightFromCursor = Math.max(
              1,
              state.imageScaling.corner === "n"
                ? state.imageScaling.startCenterY - localY
                : localY - state.imageScaling.startCenterY
            );
            nextHeight = halfHeightFromCursor * 2;
            nextWidth = nextHeight * aspect;
          } else {
            const halfWidthFromCursor = Math.max(
              1,
              state.imageScaling.isWest
                ? state.imageScaling.startCenterX - localX
                : localX - state.imageScaling.startCenterX
            );
            const halfHeightFromCursor = Math.max(
              1,
              state.imageScaling.isNorth
                ? state.imageScaling.startCenterY - localY
                : localY - state.imageScaling.startCenterY
            );
            const widthFromHeight = halfHeightFromCursor * 2 * aspect;
            const heightFromWidth = (halfWidthFromCursor * 2) / aspect;
            nextWidth = Math.max(halfWidthFromCursor * 2, widthFromHeight);
            nextHeight = Math.max(halfHeightFromCursor * 2, heightFromWidth);
          }
          nextLeft = state.imageScaling.startCenterX - nextWidth * 0.5;
          nextTop = state.imageScaling.startCenterY - nextHeight * 0.5;
        } else {
          let scaleRatio;
          if (state.imageScaling.isHorizontalEdge) {
            const widthFromCursor = Math.max(
              1,
              state.imageScaling.corner === "w"
                ? state.imageScaling.oppositeX - localX
                : localX - state.imageScaling.oppositeX
            );
            scaleRatio = widthFromCursor / Math.max(1, state.imageScaling.startRectWidth);
          } else if (state.imageScaling.isVerticalEdge) {
            const heightFromCursor = Math.max(
              1,
              state.imageScaling.corner === "n"
                ? state.imageScaling.oppositeY - localY
                : localY - state.imageScaling.oppositeY
            );
            scaleRatio = heightFromCursor / Math.max(1, state.imageScaling.startRectHeight);
          } else {
            const widthFromCursor = Math.max(
              1,
              state.imageScaling.isWest
                ? state.imageScaling.oppositeX - localX
                : localX - state.imageScaling.oppositeX
            );
            const heightFromCursor = Math.max(
              1,
              state.imageScaling.isNorth
                ? state.imageScaling.oppositeY - localY
                : localY - state.imageScaling.oppositeY
            );
            const widthScale = widthFromCursor / Math.max(1, state.imageScaling.startRectWidth);
            const heightScale = heightFromCursor / Math.max(1, state.imageScaling.startRectHeight);
            scaleRatio = Math.max(widthScale, heightScale);
          }
          nextWidth = state.imageScaling.startRectWidth * scaleRatio;
          nextHeight = state.imageScaling.startRectHeight * scaleRatio;
          nextLeft =
            state.imageScaling.corner === "w" || state.imageScaling.isWest
              ? state.imageScaling.oppositeX - nextWidth
              : state.imageScaling.oppositeX;
          nextTop =
            state.imageScaling.corner === "n" || state.imageScaling.isNorth
              ? state.imageScaling.oppositeY - nextHeight
              : state.imageScaling.oppositeY;
          if (state.imageScaling.isHorizontalEdge) {
            nextTop = state.imageScaling.startCenterY - nextHeight * 0.5;
          }
          if (state.imageScaling.isVerticalEdge) {
            nextLeft = state.imageScaling.startCenterX - nextWidth * 0.5;
          }
        }

        const relativeScale = nextWidth / Math.max(1, state.imageScaling.startRectWidth);
        state.imageGenerator.imageScale = clampImageScale(
          state.imageScaling.startScale * relativeScale
        );

        const nextCenterX = nextLeft + nextWidth * 0.5;
        const nextCenterY = nextTop + nextHeight * 0.5;
        state.imageGenerator.offsetX = nextCenterX - paintCanvas.width * 0.5;
        state.imageGenerator.offsetY = nextCenterY - paintCanvas.height * 0.5;
        updateLabels();
        scheduleImageGeneration();
      }

      function endImageScale() {
        if (!state.imageScaling) {
          return;
        }
        if (
          state.imageScaling.handleElement &&
          state.imageScaling.pointerId !== null &&
          state.imageScaling.handleElement.hasPointerCapture(state.imageScaling.pointerId)
        ) {
          state.imageScaling.handleElement.releasePointerCapture(state.imageScaling.pointerId);
        }
        state.imageScaling = null;
        document.body.classList.remove("is-scrubbing-size");
      }

      function updateCursorPreview() {
        const hardnessPercent = Math.round(state.brushHardness * 100);
        const previewOpacity = Math.min(0.76, 0.16 + Math.pow(state.brushHardness, 0.5) * 0.6);
        const hardCore = 3 + state.brushHardness * 67;
        const softCore = 8 + state.brushHardness * 60;
        const midFalloff = 18 + state.brushHardness * 58;
        const edgeFalloff = 34 + state.brushHardness * 62;
        const outerFalloff = 58 + state.brushHardness * 32;
        cursorFill.style.opacity = String(previewOpacity);
        cursorFill.style.background = `radial-gradient(circle, rgba(204, 255, 0, 0.98) 0%, rgba(204, 255, 0, 0.98) ${hardCore.toFixed(0)}%, rgba(204, 255, 0, 0.9) ${softCore.toFixed(0)}%, rgba(204, 255, 0, 0.72) ${midFalloff.toFixed(0)}%, rgba(204, 255, 0, 0.38) ${edgeFalloff.toFixed(0)}%, rgba(204, 255, 0, 0.14) ${outerFalloff.toFixed(0)}%, rgba(204, 255, 0, 0) 100%)`;
        cursorReadout.innerHTML = `Diameter: <strong>${Math.round(state.brushSize)} px</strong><br>Hardness: <strong>${hardnessPercent}%</strong>`;
      }

      function clearTooltipTimer() {
        if (state.tooltipTimerId) {
          window.clearTimeout(state.tooltipTimerId);
          state.tooltipTimerId = 0;
        }
      }

      function clearTooltipHideTimer() {
        if (state.tooltipHideTimerId) {
          window.clearTimeout(state.tooltipHideTimerId);
          state.tooltipHideTimerId = 0;
        }
      }

      function hideAppTooltip() {
        clearTooltipTimer();
        clearTooltipHideTimer();
        state.tooltipTarget = null;
        appTooltip.classList.remove("is-visible");
        appTooltip.setAttribute("aria-hidden", "true");
        state.tooltipHideTimerId = window.setTimeout(() => {
          appTooltip.hidden = true;
          appTooltip.classList.remove("is-light");
          state.tooltipHideTimerId = 0;
        }, 250);
      }

      function positionAppTooltip(target) {
        if (!target) {
          return;
        }

        const label = target.getAttribute("data-tooltip");
        if (!label) {
          hideAppTooltip();
          return;
        }

        appTooltipLabel.textContent = label;
        appTooltip.classList.toggle("is-light", Boolean(target.closest(".sidebar")));
        appTooltip.hidden = false;
        appTooltip.setAttribute("aria-hidden", "false");

        const rect = target.getBoundingClientRect();
        const tooltipRect = appTooltip.getBoundingClientRect();
        const viewportPadding = 8;
        const desiredCenter = rect.left + rect.width / 2;
        const top = Math.max(
          viewportPadding,
          rect.top - tooltipRect.height - 10
        );
        const minLeft = viewportPadding;
        const maxLeft = Math.max(
          viewportPadding,
          window.innerWidth - tooltipRect.width - viewportPadding
        );
        const left = Math.min(
          maxLeft,
          Math.max(minLeft, desiredCenter - tooltipRect.width / 2)
        );
        const arrowLeft = Math.min(
          tooltipRect.width - 12,
          Math.max(12, desiredCenter - left)
        );

        appTooltip.style.left = `${left}px`;
        appTooltip.style.top = `${top}px`;
        appTooltip.style.setProperty("--tooltip-arrow-left", `${arrowLeft}px`);
      }

      function showAppTooltip(target) {
        clearTooltipTimer();
        clearTooltipHideTimer();
        state.tooltipTarget = target;
        state.tooltipTimerId = window.setTimeout(() => {
          state.tooltipTimerId = 0;
          if (state.tooltipTarget !== target) {
            return;
          }
          positionAppTooltip(target);
          requestAnimationFrame(() => {
            if (state.tooltipTarget === target) {
              appTooltip.classList.add("is-visible");
            }
          });
        }, 500);
      }

      function refreshAppTooltip() {
        if (!state.tooltipTarget || appTooltip.hidden) {
          return;
        }
        positionAppTooltip(state.tooltipTarget);
      }

      function getTooltipTrigger(node) {
        return node instanceof Element ? node.closest("[data-tooltip]") : null;
      }

      function handleTooltipPointerOver(event) {
        const nextTarget = getTooltipTrigger(event.target);
        if (!nextTarget || !nextTarget.getAttribute("data-tooltip")) {
          return;
        }
        if (nextTarget === state.tooltipTarget) {
          return;
        }
        showAppTooltip(nextTarget);
      }

      function handleTooltipPointerOut(event) {
        const currentTarget = getTooltipTrigger(event.target);
        if (!currentTarget) {
          return;
        }
        const relatedTarget = event.relatedTarget;
        if (relatedTarget instanceof Node && currentTarget.contains(relatedTarget)) {
          return;
        }
        if (currentTarget === state.tooltipTarget) {
          hideAppTooltip();
        }
      }

      function handleTooltipFocusIn(event) {
        const target = getTooltipTrigger(event.target);
        if (!target || !target.getAttribute("data-tooltip")) {
          return;
        }
        if (!(target instanceof HTMLElement) || !target.matches(":focus-visible")) {
          return;
        }
        showAppTooltip(target);
      }

      function handleTooltipFocusOut(event) {
        const target = getTooltipTrigger(event.target);
        if (!target) {
          return;
        }
        const relatedTarget = event.relatedTarget;
        if (relatedTarget instanceof Node && target.contains(relatedTarget)) {
          return;
        }
        if (target === state.tooltipTarget) {
          hideAppTooltip();
        }
      }

      function setFloatingToolbarVisibility(hidden, immediate = false) {
        const currentHidden = floatingToolbarShell.classList.contains("is-toolbar-hidden");

        if (!immediate && currentHidden === hidden) {
          return;
        }

        if (immediate) {
          const previousTransition = floatingToolbarShell.style.transition;
          floatingToolbarShell.style.transition = "none";
          floatingToolbarShell.classList.toggle("is-toolbar-hidden", hidden);
          void floatingToolbarShell.offsetHeight;
          floatingToolbarShell.style.transition = previousTransition;
          return;
        }

        floatingToolbarShell.classList.toggle("is-toolbar-hidden", hidden);
      }

      function setZoomToolbarVisibility(hidden, immediate = false) {
        const currentHidden = zoomToolbarShell.classList.contains("is-toolbar-hidden");

        if (!immediate && currentHidden === hidden) {
          return;
        }

        if (immediate) {
          const previousTransition = zoomToolbarShell.style.transition;
          zoomToolbarShell.style.transition = "none";
          zoomToolbarShell.classList.toggle("is-toolbar-hidden", hidden);
          void zoomToolbarShell.offsetHeight;
          zoomToolbarShell.style.transition = previousTransition;
          return;
        }

        zoomToolbarShell.classList.toggle("is-toolbar-hidden", hidden);
      }

      function pushHistoryEntries(entries) {
        state.history.push({ entries });
        state.redoHistory = [];
        if (state.history.length > state.maxHistory) {
          state.history.shift();
        }
        updateToggleButtons();
      }

      function pushHistoryEntry(layerName) {
        const layerCanvas = layerCanvases[layerName];
        const layerCtx = layerContexts[layerName];
        const snapshot = layerCtx.getImageData(0, 0, layerCanvas.width, layerCanvas.height);
        pushHistoryEntries([
          {
            layer: layerName,
            width: layerCanvas.width,
            height: layerCanvas.height,
            snapshot,
          },
        ]);
      }

      function pushHistoryForLayers(layerNames) {
        const entries = layerNames.map((layerName) => {
          const layerCanvas = layerCanvases[layerName];
          const layerCtx = layerContexts[layerName];
          return {
            layer: layerName,
            width: layerCanvas.width,
            height: layerCanvas.height,
            snapshot: layerCtx.getImageData(0, 0, layerCanvas.width, layerCanvas.height),
          };
        });
        pushHistoryEntries(entries);
      }

      function undoLastAction() {
        const entry = state.history.pop();
        if (!entry) {
          return;
        }
        const entries = Array.isArray(entry.entries)
          ? entry.entries
          : [entry];
        const redoEntries = [];
        for (const layerEntry of entries) {
          const layerCanvas = layerCanvases[layerEntry.layer];
          const layerCtx = layerContexts[layerEntry.layer];
          if (layerCanvas.width !== layerEntry.width || layerCanvas.height !== layerEntry.height) {
            return;
          }
          redoEntries.push({
            layer: layerEntry.layer,
            width: layerEntry.width,
            height: layerEntry.height,
            snapshot: layerCtx.getImageData(0, 0, layerCanvas.width, layerCanvas.height),
          });
        }
        state.redoHistory.push({ entries: redoEntries });
        if (state.redoHistory.length > state.maxHistory) {
          state.redoHistory.shift();
        }
        for (const layerEntry of entries) {
          layerContexts[layerEntry.layer].putImageData(layerEntry.snapshot, 0, 0);
        }
        syncLayerContentState(entries.map((layerEntry) => layerEntry.layer));
        updateToggleButtons();
        redrawOverlay();
        scheduleRender();
      }

      function redoLastAction() {
        const entry = state.redoHistory.pop();
        if (!entry) {
          return;
        }
        const entries = Array.isArray(entry.entries)
          ? entry.entries
          : [entry];
        const undoEntries = [];
        for (const layerEntry of entries) {
          const layerCanvas = layerCanvases[layerEntry.layer];
          const layerCtx = layerContexts[layerEntry.layer];
          if (layerCanvas.width !== layerEntry.width || layerCanvas.height !== layerEntry.height) {
            return;
          }
          undoEntries.push({
            layer: layerEntry.layer,
            width: layerEntry.width,
            height: layerEntry.height,
            snapshot: layerCtx.getImageData(0, 0, layerCanvas.width, layerCanvas.height),
          });
        }
        state.history.push({ entries: undoEntries });
        if (state.history.length > state.maxHistory) {
          state.history.shift();
        }
        for (const layerEntry of entries) {
          layerContexts[layerEntry.layer].putImageData(layerEntry.snapshot, 0, 0);
        }
        syncLayerContentState(entries.map((layerEntry) => layerEntry.layer));
        updateToggleButtons();
        redrawOverlay();
        scheduleRender();
      }

      function getActiveLayerContext() {
        return layerContexts[state.activeLayer];
      }

      function getActiveLayerCanvas() {
        return layerCanvases[state.activeLayer];
      }

      function resetCanvas(width, height) {
        state.history = [];
        state.redoHistory = [];
        state.viewOffsetX = 0;
        state.viewOffsetY = 0;
        layerCanvases.front.width = width;
        layerCanvases.front.height = height;
        layerCanvases.back.width = width;
        layerCanvases.back.height = height;
        for (const ctx of Object.values(layerContexts)) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);
        }
        state.layerHasContent.front = false;
        state.layerHasContent.back = false;
        updateFrameDimensions(width, height);
        updateToggleButtons();
        redrawOverlay();
        centerViewport();
        if (state.generatorMode === "image" && state.referenceImageUrl) {
          scheduleImageGeneration(true);
        }
        scheduleRender();
      }

      function updateFrameDimensions(width, height) {
        paintCanvas.width = width;
        paintCanvas.height = height;
        paintCanvas.style.width = `${width}px`;
        paintCanvas.style.height = `${height}px`;
        frontSvgPreview.style.width = `${width}px`;
        frontSvgPreview.style.height = `${height}px`;
        backSvgPreview.style.width = `${width}px`;
        backSvgPreview.style.height = `${height}px`;
        cursorRing.style.width = `${state.brushSize}px`;
        cursorRing.style.height = `${state.brushSize}px`;
        canvasStatus.textContent = `${width} × ${height} px`;
        widthInput.value = width;
        heightInput.value = height;
        updateReferenceImageTransform();
      }

      function resizeCanvasPreserveContent(width, height) {
        const frontSnapshot = document.createElement("canvas");
        frontSnapshot.width = layerCanvases.front.width;
        frontSnapshot.height = layerCanvases.front.height;
        frontSnapshot.getContext("2d").drawImage(layerCanvases.front, 0, 0);

        const backSnapshot = document.createElement("canvas");
        backSnapshot.width = layerCanvases.back.width;
        backSnapshot.height = layerCanvases.back.height;
        backSnapshot.getContext("2d").drawImage(layerCanvases.back, 0, 0);

        state.history = [];
        state.redoHistory = [];
        state.viewOffsetX = 0;
        state.viewOffsetY = 0;

        const nextDocWidth = Math.max(width, layerCanvases.front.width);
        const nextDocHeight = Math.max(height, layerCanvases.front.height);

        if (
          nextDocWidth !== layerCanvases.front.width ||
          nextDocHeight !== layerCanvases.front.height
        ) {
          layerCanvases.front.width = nextDocWidth;
          layerCanvases.front.height = nextDocHeight;
          layerCanvases.back.width = nextDocWidth;
          layerCanvases.back.height = nextDocHeight;

          for (const ctx of Object.values(layerContexts)) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, nextDocWidth, nextDocHeight);
          }

          layerContexts.front.drawImage(frontSnapshot, 0, 0);
          layerContexts.back.drawImage(backSnapshot, 0, 0);
        }

        updateFrameDimensions(width, height);
        updateToggleButtons();
        redrawOverlay();
        centerViewport();
        scheduleRender();
      }

      function setReferenceImage(url, width, height) {
        if (state.referenceImageUrl && state.referenceImageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(state.referenceImageUrl);
        }
        state.referenceImageUrl = url;
        state.referenceImageWidth = width;
        state.referenceImageHeight = height;
        resetImagePlacement();
        state.imageTransformVisible = true;
        referenceImage.src = url;
        referenceImage.style.opacity = String(state.layerOpacity.image);
        referenceImage.hidden = false;
        state.layerVisibility.image = true;
        updateToggleButtons();
        updateLabels();
        updatePanCursor();
      }

      function clearReferenceImage() {
        cancelImageGenerationDebounce();
        state.imageGenerationSequence += 1;
        if (state.referenceImageUrl && state.referenceImageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(state.referenceImageUrl);
        }
        state.referenceImageUrl = "";
        state.referenceImageWidth = 0;
        state.referenceImageHeight = 0;
        state.referenceImageName = "";
        resetImagePlacement();
        state.imageTransformVisible = false;
        referenceImage.removeAttribute("src");
        referenceImage.hidden = true;
        referenceImageInput.value = "";
        state.layerVisibility.image = false;
        updateToggleButtons();
        updateLabels();
        updatePanCursor();
      }

      function applyProcessedImageToLayer(targetLayer, imageData) {
        const targetCtx = layerContexts[targetLayer];
        targetCtx.putImageData(imageData, 0, 0);
      }

      function cancelImageGenerationDebounce() {
        if (state.imageGenerationDebounceId) {
          window.clearTimeout(state.imageGenerationDebounceId);
          state.imageGenerationDebounceId = 0;
        }
      }

      function buildImageGeneratorMap() {
        if (!state.referenceImageUrl) {
          return null;
        }

        const sourceImage = new Image();
        sourceImage.src = state.referenceImageUrl;

        return new Promise((resolve, reject) => {
          sourceImage.onload = () => {
            const width = paintCanvas.width;
            const height = paintCanvas.height;
            const offscreen = document.createElement("canvas");
            offscreen.width = width;
            offscreen.height = height;
            const ctx = offscreen.getContext("2d", { willReadFrequently: true });
            const placement = getImagePlacementRect();
            ctx.drawImage(
              sourceImage,
              placement.x,
              placement.y,
              placement.width,
              placement.height
            );

            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            const brightness = state.imageGenerator.brightness;
            const contrast = state.imageGenerator.contrast;
            const gamma = state.imageGenerator.gamma;
            const cutoff = state.imageGenerator.cutoff;

            for (let index = 0; index < data.length; index += 4) {
              const alpha = data[index + 3] / 255;

              if (alpha <= 0.01) {
                data[index] = 255;
                data[index + 1] = 255;
                data[index + 2] = 255;
                data[index + 3] = 255;
                continue;
              }

              const red = 255 - (255 - data[index]) * alpha;
              const green = 255 - (255 - data[index + 1]) * alpha;
              const blue = 255 - (255 - data[index + 2]) * alpha;
              const luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
              let normalized = luminance;
              normalized = Math.max(0, Math.min(1, normalized + brightness));
              normalized = Math.max(
                0,
                Math.min(1, (normalized - 0.5) * (1 + contrast * 1.8) + 0.5)
              );
              normalized = Math.pow(normalized, gamma);
              if (normalized >= cutoff) {
                normalized = 0;
              } else {
                normalized = normalized / cutoff;
              }
              const channel = Math.max(0, Math.min(255, Math.round((1 - normalized) * 255)));
              data[index] = channel;
              data[index + 1] = channel;
              data[index + 2] = channel;
              data[index + 3] = 255;
            }

            resolve(imageData);
          };
          sourceImage.onerror = () => reject(new Error("Could not process the reference image."));
        });
      }

      async function generatePatternFromImage() {
        if (!state.referenceImageUrl) {
          return;
        }

        const sequence = ++state.imageGenerationSequence;

        try {
          const imageData = await buildImageGeneratorMap();
          if (!imageData || sequence !== state.imageGenerationSequence) {
            return;
          }

          const frontCtx = layerContexts.front;
          const backCtx = layerContexts.back;
          frontCtx.fillStyle = "#ffffff";
          frontCtx.fillRect(0, 0, layerCanvases.front.width, layerCanvases.front.height);
          backCtx.fillStyle = "#ffffff";
          backCtx.fillRect(0, 0, layerCanvases.back.width, layerCanvases.back.height);
          applyProcessedImageToLayer(
            "front",
            new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height)
          );
          state.activeLayer = "front";
          redrawOverlay();
          scheduleRender();
        } catch (error) {
          if (sequence === state.imageGenerationSequence) {
            window.alert("Could not generate the pattern from this image.");
          }
        }
      }

      function scheduleImageGeneration(immediate = false) {
        cancelImageGenerationDebounce();
        if (state.generatorMode !== "image" || !state.referenceImageUrl) {
          return;
        }
        if (immediate) {
          generatePatternFromImage();
          return;
        }
        state.imageGenerationDebounceId = window.setTimeout(() => {
          state.imageGenerationDebounceId = 0;
          generatePatternFromImage();
        }, 60);
      }

      function redrawOverlay() {
        paintCtx.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
        if (!state.showOverlay) {
          return;
        }
        const activeCtx = getActiveLayerContext();
        const width = paintCanvas.width;
        const height = paintCanvas.height;
        const sourceData = activeCtx.getImageData(0, 0, width, height);
        const overlayData = paintCtx.createImageData(width, height);

        for (let index = 0; index < sourceData.data.length; index += 4) {
          const value = sourceData.data[index];
          const darkness = 255 - value;
          overlayData.data[index] = 204;
          overlayData.data[index + 1] = 255;
          overlayData.data[index + 2] = 0;
          overlayData.data[index + 3] = Math.round(darkness * 0.45);
        }

        paintCtx.putImageData(overlayData, 0, 0);
      }

      function updateToggleButtons() {
        const hasReferenceImage = Boolean(state.referenceImageUrl);
        const isImageMode = state.generatorMode === "image";
        const imageControlsEnabled = hasReferenceImage && state.layerVisibility.image && !isImageMode;
        const isTextureMode = state.generatorMode === "texture";
        frontLayerButton.classList.toggle("active", state.activeLayer === "front");
        backLayerButton.classList.toggle("active", state.activeLayer === "back");
        frontLayerButton.classList.toggle("is-hidden-layer", !state.layerVisibility.front);
        backLayerButton.classList.toggle("is-hidden-layer", !state.layerVisibility.back);
        imageControlRow.classList.toggle("is-empty", !hasReferenceImage);
        imageOpacityRow.classList.toggle("is-disabled", !imageControlsEnabled);
        imageOpacityRow.hidden = !hasReferenceImage || isImageMode;
        imageOpacityRow.classList.toggle("is-hidden", !hasReferenceImage || isImageMode);
        imageLayerVisibilityButton.disabled = !hasReferenceImage || isImageMode;
        imageLayerVisibilityButton.hidden = isImageMode;
        imageOpacityInput.disabled = !imageControlsEnabled;
        clearImageButton.hidden = !hasReferenceImage;
        clearImageButton.classList.toggle("is-hidden", !hasReferenceImage);
        imageAdjustmentsSection.hidden = isImageMode && !hasReferenceImage;
        imageAdjustmentsSection.classList.toggle("is-hidden", isImageMode && !hasReferenceImage);
        imageLayerRow.classList.remove("is-hidden-layer");
        const frontHasPattern = state.layerHasContent.front;
        const backHasPattern = state.layerHasContent.back;
        const bothHavePattern = frontHasPattern && backHasPattern;
        const frontExportAvailable = isImageMode ? state.latestCounts.front > 0 : frontHasPattern;
        frontLayerDeleteButton.disabled = !frontHasPattern;
        backLayerDeleteButton.disabled = !backHasPattern;
        frontLayerDeleteButton.classList.toggle("is-disabled", !frontHasPattern);
        backLayerDeleteButton.classList.toggle("is-disabled", !backHasPattern);
        frontLayerVisibilityIcon.setAttribute("href", state.layerVisibility.front ? "#i-eye" : "#i-eye-off");
        backLayerVisibilityIcon.setAttribute("href", state.layerVisibility.back ? "#i-eye" : "#i-eye-off");
        imageLayerVisibilityIcon.setAttribute("href", !hasReferenceImage || state.layerVisibility.image ? "#i-eye" : "#i-eye-off");
        topCopyButton.setAttribute("data-tooltip", isImageMode ? "Copy Pattern" : "Copy top layer");
        topCopyButton.setAttribute("aria-label", isImageMode ? "Copy pattern" : "Copy top layer SVG");
        downloadFrontButton.setAttribute("data-tooltip", isImageMode ? "Download Pattern" : "Download top layer");
        downloadFrontButton.setAttribute("aria-label", isImageMode ? "Download pattern" : "Download top layer");
        topCopyButton.disabled = !frontExportAvailable;
        downloadFrontButton.disabled = !frontExportAvailable;
        bottomCopyButton.disabled = !backHasPattern;
        downloadBackButton.disabled = !backHasPattern;
        downloadBothButton.disabled = !bothHavePattern;
        topCopyButton.classList.toggle("is-disabled", !frontExportAvailable);
        downloadFrontButton.classList.toggle("is-disabled", !frontExportAvailable);
        bottomCopyButton.classList.toggle("is-disabled", !backHasPattern);
        downloadBackButton.classList.toggle("is-disabled", !backHasPattern);
        downloadBothButton.classList.toggle("is-disabled", !bothHavePattern);
        paintModeButton.classList.toggle("active", state.mode === "paint");
        eraseModeButton.classList.toggle("active", state.mode === "erase");
        moveModeButton.classList.toggle("active", state.mode === "move");
        zoomModeButton.classList.toggle("active", state.mode === "zoom");
        overlayToggleVisibleButton.classList.toggle("active", state.showOverlay);
        overlayToggleVisibleButton.setAttribute("aria-label", state.showOverlay ? "Hide brush strokes" : "Show brush strokes");
        overlayToggleVisibleButton.setAttribute("data-tooltip", state.showOverlay ? "Hide brush strokes" : "Show brush strokes");
        alignedGridButton.classList.toggle("active", state.gridMode === "aligned");
        staggeredGridButton.classList.toggle("active", state.gridMode === "staggered");
        undoButton.classList.toggle("is-available", state.history.length > 0);
        undoButton.classList.toggle("is-disabled", state.history.length === 0);
        redoButton.classList.toggle("is-available", state.redoHistory.length > 0);
        redoButton.classList.toggle("is-disabled", state.redoHistory.length === 0);
        floatingControls.style.display = isTextureMode ? "" : "none";
        refreshAppTooltip();
      }

      function updatePanCursor() {
        overlayWrap.classList.toggle("pan-ready", state.panKeyDown && !state.panning);
        overlayWrap.classList.toggle("panning", state.panning);
        overlayWrap.classList.toggle("move-ready", state.mode === "move" && !state.movingPattern);
        overlayWrap.classList.toggle("moving-pattern", state.movingPattern);
        overlayWrap.classList.toggle(
          "image-drag-ready",
          state.generatorMode === "image" && Boolean(state.referenceImageUrl) && !state.imageDragging && !state.imageScaling
        );
        overlayWrap.classList.toggle("image-dragging", state.imageDragging);
        syncCursorRingOpacity();
      }

      function updateRangeFill(input) {
        const min = Number(input.min || 0);
        const max = Number(input.max || 100);
        const value = Number(input.value || min);
        const span = Math.max(1, max - min);
        const percent = ((value - min) / span) * 100;
        input.parentElement?.style.setProperty("--range-fill", `${percent}%`);
      }

      function updateLabels() {
        brushSizeInput.value = String(Math.round(state.brushSize));
        brushHardnessInput.value = String(Math.round(state.brushHardness * 100));
        brushFlowInput.value = String(Math.round(state.brushFlow * 100));
        sizeCurveInput.value = String(Math.round(state.sizeCurve * 100));
        sizeCutoffInput.value = String(Math.round(state.sizeCutoff * 100));
        flowResponseInput.value = String(Math.round(state.flowResponse * 100));
        imageBrightnessInput.value = String(Math.round(state.imageGenerator.brightness * 100));
        imageContrastInput.value = String(Math.round(state.imageGenerator.contrast * 100));
        imageGammaInput.value = String(Math.round(state.imageGenerator.gamma * 100));
        imageCutoffInput.value = String(Math.round(state.imageGenerator.cutoff * 100));
        imageDensityInput.value = String(Math.round(imageDensityToPercent(state.imageGenerator.density)));
        imageScaleInput.value = String(Math.round(state.imageGenerator.imageScale * 100));
        brushSizeValue.textContent = `${Math.round(state.brushSize)}`;
        brushHardnessValue.textContent = `${Math.round(state.brushHardness * 100)}%`;
        brushFlowValue.textContent = `${Math.round(state.brushFlow * 100)}%`;
        spacingValue.textContent = `${Math.round(state.spacing)} px`;
        minDotValue.textContent = `${state.minDot.toFixed(1)} px`;
        dotScaleValue.textContent = `${Math.round(state.dotScale * 100)}%`;
        strokeWidthValue.textContent = `${Math.round(state.strokeWidth)} px`;
        strokeTaperValue.textContent = `${Math.round(state.strokeTaper * 100)}%`;
        sizeCurveValue.textContent = `${state.sizeCurve.toFixed(1)}x`;
        sizeCutoffValue.textContent = `${state.sizeCutoff.toFixed(1)} px`;
        flowResponseValue.textContent = `${state.flowResponse.toFixed(1)}x`;
        imageBrightnessValue.textContent = `${Math.round(state.imageGenerator.brightness * 100)}%`;
        imageContrastValue.textContent = `${Math.round(state.imageGenerator.contrast * 100)}%`;
        imageGammaValue.textContent = `${state.imageGenerator.gamma.toFixed(1)}x`;
        imageCutoffValue.textContent = `${Math.round(state.imageGenerator.cutoff * 100)}%`;
        imageDensityValue.textContent = `${Math.round(imageDensityToPercent(state.imageGenerator.density))}%`;
        imageScaleValue.textContent = `${Math.round(state.imageGenerator.imageScale * 100)}%`;
        imageOpacityValue.textContent = `${Math.round(state.layerOpacity.image * 100)}%`;
        zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
        zoomStatusValue.textContent = `${Math.round(state.zoom * 100)}%`;
        cursorRing.style.width = `${Math.round(state.brushSize)}px`;
        cursorRing.style.height = `${Math.round(state.brushSize)}px`;
        dotColorVisible.value = state.dotColor;
        dotColorSwatch.style.background = state.dotColor;
        imageOpacityInput.value = String(Math.round(state.layerOpacity.image * 100));
        referenceImage.style.opacity = String(state.layerOpacity.image);
        referenceImage.hidden =
          !state.referenceImageUrl ||
          state.generatorMode === "image" ||
          !state.layerVisibility.image;
        updateReferenceImageTransform();
        frontSvgPreview.style.opacity = String(state.layerOpacity.front);
        backSvgPreview.style.opacity = String(state.layerOpacity.back);
        if (state.generatorMode === "image") {
          frontSvgPreview.style.display = "grid";
          backSvgPreview.style.display = "none";
        } else {
          frontSvgPreview.style.display = state.layerVisibility.front ? "grid" : "none";
          backSvgPreview.style.display = state.layerVisibility.back ? "grid" : "none";
        }
        if (state.showOverlay && (state.activeLayer === "front" ? state.layerVisibility.front : state.layerVisibility.back)) {
          paintCanvas.style.opacity = String(state.activeLayer === "front" ? state.layerOpacity.front : state.layerOpacity.back);
        } else {
          paintCanvas.style.opacity = "0";
        }
        imageNameLabel.textContent = state.referenceImageName || "Choose image...";
        markCountStatus.textContent =
          state.generatorMode === "image"
            ? `${state.latestCounts.front.toLocaleString()} marks`
            : `Top ${state.latestCounts.front.toLocaleString()} • Bottom ${state.latestCounts.back.toLocaleString()}`;
        document.querySelectorAll('input[type="range"]').forEach(updateRangeFill);
        updateViewportTransform();
        updateCursorPreview();
      }

      function clampPointToCanvas(x, y) {
        return {
          x: Math.max(0, Math.min(paintCanvas.width, x)),
          y: Math.max(0, Math.min(paintCanvas.height, y)),
        };
      }

      function getCanvasPoint(event, shouldClamp = true) {
        const rect = paintCanvas.getBoundingClientRect();
        const scaleX = paintCanvas.width / rect.width;
        const scaleY = paintCanvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
        return shouldClamp ? clampPointToCanvas(x, y) : { x, y };
      }

      function createPatternMoveSnapshots() {
        const snapshots = {};
        for (const layerName of ["front", "back"]) {
          const sourceCanvas = layerCanvases[layerName];
          const snapshotCanvas = document.createElement("canvas");
          snapshotCanvas.width = sourceCanvas.width;
          snapshotCanvas.height = sourceCanvas.height;
          snapshotCanvas.getContext("2d").drawImage(sourceCanvas, 0, 0);
          snapshots[layerName] = snapshotCanvas;
        }
        return snapshots;
      }

      function restorePatternMoveSnapshots() {
        if (!state.patternMoveSnapshots) {
          return;
        }
        for (const layerName of ["front", "back"]) {
          const layerCtx = layerContexts[layerName];
          const layerCanvas = layerCanvases[layerName];
          layerCtx.fillStyle = "#ffffff";
          layerCtx.fillRect(0, 0, layerCanvas.width, layerCanvas.height);
          layerCtx.drawImage(
            state.patternMoveSnapshots[layerName],
            state.patternMoveDeltaX,
            state.patternMoveDeltaY
          );
        }
        redrawOverlay();
        scheduleRender();
      }

      function getEffectiveBrushFlow(hardness = state.brushHardness) {
        const normalizedHardness = Math.max(0, Math.min(1, hardness));
        const hardnessBoost = Math.pow(normalizedHardness, state.flowResponse);
        return state.brushFlow + (1 - state.brushFlow) * hardnessBoost;
      }

      function paintStroke(from, to) {
        const activeCtx = getActiveLayerContext();
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.hypot(dx, dy);
        const radius = state.brushSize * 0.5;
        const effectiveFlow = getEffectiveBrushFlow();
        const spacing = Math.max(1, radius * (0.14 + (1 - effectiveFlow) * 0.34));
        const stampCount =
          distance <= 0.5
            ? 1
            : Math.max(2, Math.ceil(distance / spacing) + 1);

        for (let step = 0; step < stampCount; step += 1) {
          const t = stampCount === 1 ? 0 : step / (stampCount - 1);
          const x = from.x + dx * t;
          const y = from.y + dy * t;
          stampBrush(activeCtx, x, y, radius);
        }
        redrawOverlay();
      }

      function stampBrush(ctx, x, y, radius) {
        const hardness = state.brushHardness;
        const effectiveFlow = getEffectiveBrushFlow(hardness);
        const left = Math.max(0, Math.floor(x - radius));
        const top = Math.max(0, Math.floor(y - radius));
        const right = Math.min(ctx.canvas.width, Math.ceil(x + radius));
        const bottom = Math.min(ctx.canvas.height, Math.ceil(y + radius));
        const width = Math.max(0, right - left);
        const height = Math.max(0, bottom - top);

        if (!width || !height) {
          return;
        }

        const imageData = ctx.getImageData(left, top, width, height);
        const data = imageData.data;
        const hardCore = 0.015 + Math.pow(hardness, 1.8) * 0.62;
        const falloffExponent = 2.4 + (1 - hardness) * 4.2;
        const centerFlow = (0.22 + Math.pow(hardness, 0.55) * 0.78) * effectiveFlow;

        for (let yy = 0; yy < height; yy += 1) {
          for (let xx = 0; xx < width; xx += 1) {
            const px = left + xx + 0.5;
            const py = top + yy + 0.5;
            const dx = px - x;
            const dy = py - y;
            const distance = Math.hypot(dx, dy);

            if (distance > radius) {
              continue;
            }

            const normalized = radius === 0 ? 0 : distance / radius;
            let weight = 0;

            if (hardness >= 0.995) {
              weight = 1;
            } else if (normalized <= hardCore) {
              weight = 1;
            } else {
              const feather = (normalized - hardCore) / Math.max(0.0001, 1 - hardCore);
              weight = Math.pow(Math.max(0, 1 - feather), falloffExponent);
            }

            if (weight <= 0.0005) {
              continue;
            }

            const influence = centerFlow * weight;
            const index = (yy * width + xx) * 4;
            const current = data[index];

            let next = current;
            if (state.mode === "paint") {
              next = current * (1 - influence);
            } else {
              next = current + (255 - current) * influence;
            }

            const channel = Math.max(0, Math.min(255, Math.round(next)));
            data[index] = channel;
            data[index + 1] = channel;
            data[index + 2] = channel;
            data[index + 3] = 255;
          }
        }

        ctx.putImageData(imageData, left, top);
      }

      function pointerDown(event) {
        event.preventDefault();
        if (state.imageScaling) {
          return;
        }
        if (state.panKeyDown) {
          state.panning = true;
          state.panStartX = event.clientX;
          state.panStartY = event.clientY;
          state.panInitialOffsetX = state.viewOffsetX;
          state.panInitialOffsetY = state.viewOffsetY;
          hideCursorRing();
          updatePanCursor();
          paintCanvas.setPointerCapture(event.pointerId);
          return;
        }
        if (state.generatorMode === "image") {
          if (state.referenceImageUrl) {
            state.imageTransformVisible = true;
            updateImageTransformOverlay();
            const stageRect = overlayStage.getBoundingClientRect();
            state.imageDragging = true;
            state.imageDragStartX = event.clientX;
            state.imageDragStartY = event.clientY;
            state.imageDragInitialOffsetX = state.imageGenerator.offsetX;
            state.imageDragInitialOffsetY = state.imageGenerator.offsetY;
            state.imageDragScaleX = paintCanvas.width / Math.max(1, stageRect.width);
            state.imageDragScaleY = paintCanvas.height / Math.max(1, stageRect.height);
            updatePanCursor();
            paintCanvas.setPointerCapture(event.pointerId);
          }
          hideCursorRing();
          return;
        }
        if (event.altKey) {
          const anchorPoint = getCanvasPoint(event);
          state.adjustingBrush = true;
          state.brushAdjustStartX = event.clientX;
          state.brushAdjustStartY = event.clientY;
          state.brushAdjustAnchorX = anchorPoint.x;
          state.brushAdjustAnchorY = anchorPoint.y;
          state.brushAdjustInitialSize = state.brushSize;
          state.brushAdjustInitialHardness = state.brushHardness;
          showCursorRing(event);
          cursorReadout.classList.add("visible");
          paintCanvas.setPointerCapture(event.pointerId);
          return;
        }
        if (state.mode === "move") {
          state.movingPattern = true;
          state.patternMoveStartX = getCanvasPoint(event, false).x;
          state.patternMoveStartY = getCanvasPoint(event, false).y;
          state.patternMoveDeltaX = 0;
          state.patternMoveDeltaY = 0;
          state.patternMoveSnapshots = createPatternMoveSnapshots();
          pushHistoryForLayers(["front", "back"]);
          hideCursorRing();
          updatePanCursor();
          paintCanvas.setPointerCapture(event.pointerId);
          return;
        }
        state.drawing = true;
        pushHistoryEntry(state.activeLayer);
        showCursorRing(event);
        const point = getCanvasPoint(event);
        state.lastPoint = point;
        paintStroke(point, point);
        if (state.mode === "paint") {
          state.layerHasContent[state.activeLayer] = true;
          updateToggleButtons();
        }
        scheduleRender();
        paintCanvas.setPointerCapture(event.pointerId);
      }

      function pointerMove(event) {
        state.pointerInsideCanvas = true;
        if (!state.panning) {
          updateCursorRing(event);
        }
        if (state.panning) {
          event.preventDefault();
          const deltaX = event.clientX - state.panStartX;
          const deltaY = event.clientY - state.panStartY;
          state.viewOffsetX = state.panInitialOffsetX + deltaX;
          state.viewOffsetY = state.panInitialOffsetY + deltaY;
          updateViewportTransform();
          return;
        }
        if (state.imageScaling) {
          event.preventDefault();
          updateImageScale(event);
          return;
        }
        if (state.imageDragging) {
          event.preventDefault();
          state.imageGenerator.offsetX =
            state.imageDragInitialOffsetX +
            (event.clientX - state.imageDragStartX) * state.imageDragScaleX;
          state.imageGenerator.offsetY =
            state.imageDragInitialOffsetY +
            (event.clientY - state.imageDragStartY) * state.imageDragScaleY;
          updateReferenceImageTransform();
          scheduleImageGeneration();
          return;
        }
        if (state.adjustingBrush) {
          const deltaX = event.clientX - state.brushAdjustStartX;
          const deltaY = event.clientY - state.brushAdjustStartY;
          setBrushSize(state.brushAdjustInitialSize + deltaX);
          const hardnessDelta =
            Math.sign(-deltaY) * Math.pow(Math.abs(deltaY) / 320, 1.35);
          setBrushHardness(state.brushAdjustInitialHardness + hardnessDelta);
          return;
        }
        if (state.movingPattern) {
          event.preventDefault();
          const point = getCanvasPoint(event, false);
          state.patternMoveDeltaX = Math.round(point.x - state.patternMoveStartX);
          state.patternMoveDeltaY = Math.round(point.y - state.patternMoveStartY);
          restorePatternMoveSnapshots();
          return;
        }
        if (!state.drawing) {
          return;
        }
        const point = getCanvasPoint(event);
        paintStroke(state.lastPoint, point);
        state.lastPoint = point;
        if (state.mode === "paint") {
          state.layerHasContent[state.activeLayer] = true;
          updateToggleButtons();
        }
        scheduleRender();
      }

      function pointerUp(event) {
        if (state.panning) {
          state.panning = false;
          if (typeof event.pointerId === "number") {
            paintCanvas.releasePointerCapture(event.pointerId);
          }
          updatePanCursor();
          return;
        }
        if (state.imageScaling) {
          endImageScale();
          updatePanCursor();
          return;
        }
        if (state.imageDragging) {
          state.imageDragging = false;
          if (typeof event.pointerId === "number") {
            paintCanvas.releasePointerCapture(event.pointerId);
          }
          updatePanCursor();
          return;
        }
        if (state.adjustingBrush) {
          state.adjustingBrush = false;
          cursorReadout.classList.remove("visible");
          if (typeof event.pointerId === "number") {
            paintCanvas.releasePointerCapture(event.pointerId);
          }
          return;
        }
        if (state.movingPattern) {
          const hadMovement = state.patternMoveDeltaX !== 0 || state.patternMoveDeltaY !== 0;
          state.movingPattern = false;
          state.patternMoveSnapshots = null;
          if (!hadMovement) {
            state.history.pop();
            state.redoHistory = [];
            updateToggleButtons();
          } else {
            syncLayerContentState(["front", "back"]);
            updateToggleButtons();
          }
          if (typeof event.pointerId === "number") {
            paintCanvas.releasePointerCapture(event.pointerId);
          }
          updatePanCursor();
          return;
        }
        if (!state.drawing) {
          return;
        }
        state.drawing = false;
        state.lastPoint = null;
        syncLayerContentState([state.activeLayer]);
        updateToggleButtons();
        if (typeof event.pointerId === "number") {
          paintCanvas.releasePointerCapture(event.pointerId);
        }
        scheduleRender();
      }

      function updateCursorRing(event) {
        state.pointerClientX = event.clientX;
        state.pointerClientY = event.clientY;
        if (state.adjustingBrush) {
          cursorRing.style.left = `${state.brushAdjustAnchorX}px`;
          cursorRing.style.top = `${state.brushAdjustAnchorY}px`;
          return;
        }
        const rect = paintCanvas.getBoundingClientRect();
        const scaleX = paintCanvas.width / rect.width;
        const scaleY = paintCanvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
        cursorRing.style.left = `${x}px`;
        cursorRing.style.top = `${y}px`;
      }

      function getCursorRingOpacity() {
        if (
          !state.pointerInsideCanvas ||
          state.generatorMode === "image" ||
          state.mode === "move" ||
          state.mode === "zoom" ||
          state.movingPattern
        ) {
          return "0";
        }
        if (state.panKeyDown || state.panning) {
          return "0.14";
        }
        return "1";
      }

      function syncCursorRingOpacity() {
        if (state.adjustingBrush || state.drawing) {
          return;
        }
        const nextOpacity = getCursorRingOpacity();
        cursorRing.style.opacity = nextOpacity;
        if (nextOpacity === "0") {
          cursorReadout.classList.remove("visible");
        }
      }

      function showCursorRing(event) {
        if (
          state.generatorMode === "image" ||
          state.mode === "move" ||
          state.mode === "zoom" ||
          state.movingPattern
        ) {
          return;
        }
        state.pointerInsideCanvas = true;
        updateCursorRing(event);
        syncCursorRingOpacity();
        if (state.adjustingBrush) {
          cursorReadout.classList.add("visible");
        }
      }

      function hideCursorRing() {
        if (state.adjustingBrush || state.drawing || state.panning || state.movingPattern) {
          return;
        }
        cursorRing.style.opacity = "0";
        cursorReadout.classList.remove("visible");
      }

      function handleCanvasPointerEnter(event) {
        state.pointerInsideCanvas = true;
        showCursorRing(event);
      }

      function handleCanvasPointerLeave() {
        state.pointerInsideCanvas = false;
        hideCursorRing();
      }

      function handleCanvasPointerLeaveForActions(event) {
        if (
          state.drawing ||
          state.adjustingBrush ||
          state.panning ||
          state.movingPattern ||
          state.imageDragging
        ) {
          pointerUp(event);
        }
      }

      function sampleDarkness(imageData, width, x, y, radius) {
        let total = 0;
        let count = 0;
        const startX = Math.max(0, Math.floor(x - radius));
        const endX = Math.min(width - 1, Math.ceil(x + radius));
        const startY = Math.max(0, Math.floor(y - radius));
        const endY = Math.min(imageData.height - 1, Math.ceil(y + radius));

        for (let yy = startY; yy <= endY; yy += 1) {
          for (let xx = startX; xx <= endX; xx += 1) {
            const dx = xx - x;
            const dy = yy - y;
            if (dx * dx + dy * dy > radius * radius) {
              continue;
            }
            const index = (yy * width + xx) * 4;
            total += imageData.data[index];
            count += 1;
          }
        }

        if (!count) {
          return 0;
        }

        const average = total / count;
        return 1 - average / 255;
      }

      function buildLayerSvg(layerName) {
        const layerCtx = layerContexts[layerName];
        const width = paintCanvas.width;
        const height = paintCanvas.height;
        const imageData = layerCtx.getImageData(0, 0, width, height);
        const baseSpacing = state.spacing;
        const spacing =
          state.generatorMode === "image"
            ? Math.max(2, baseSpacing / state.imageGenerator.density)
            : baseSpacing;
        const spacingScale = spacing / Math.max(0.0001, baseSpacing);
        const effectiveMinDot =
          state.generatorMode === "image" ? state.minDot * spacingScale : state.minDot;
        const effectiveStrokeWidth =
          state.generatorMode === "image"
            ? Math.max(0.1, state.strokeWidth * spacingScale)
            : state.strokeWidth;
        const effectiveSizeCutoff =
          state.generatorMode === "image"
            ? state.sizeCutoff * spacingScale
            : state.sizeCutoff;
        const minimumGap =
          state.generatorMode === "image"
            ? Math.max(0.25, 4 * spacingScale)
            : 4;
        const halfGap = minimumGap * 0.5;
        const strokeInset = effectiveStrokeWidth * 0.5;
        const maxRadius = Math.max(0, (spacing * 0.5 - halfGap - strokeInset) * state.dotScale);
        const safeMaxRadius = Math.max(maxRadius, effectiveMinDot, 0.0001);
        const sampleRadius = Math.max(1, spacing * 0.42);
        const circles = [];
        let dotCount = 0;

        let rowIndex = 0;
        for (let y = spacing / 2; y < height; y += spacing) {
          const rowOffset = state.gridMode === "staggered" && rowIndex % 2 === 1 ? spacing * 0.5 : 0;
          for (let x = spacing / 2 + rowOffset; x < width; x += spacing) {
            const darkness = sampleDarkness(imageData, width, x, y, sampleRadius);
            if (darkness <= 0.001) {
              continue;
            }
            const curvedDarkness = Math.pow(darkness, state.sizeCurve);
            const radius =
              effectiveMinDot + curvedDarkness * Math.max(0, maxRadius - effectiveMinDot);
            if (radius <= 0.01) {
              continue;
            }
            if (radius < effectiveSizeCutoff) {
              continue;
            }
            const arm = radius;
            const normalizedSize = Math.max(0, Math.min(1, radius / safeMaxRadius));
            const taperedWidth =
              effectiveStrokeWidth *
              (1 - state.strokeTaper + state.strokeTaper * normalizedSize);
            const strokeWidth = Math.max(0.1, taperedWidth);
            circles.push(
              `<path d="M ${(x - arm).toFixed(2)} ${y.toFixed(2)} L ${(x + arm).toFixed(2)} ${y.toFixed(2)} M ${x.toFixed(2)} ${(y - arm).toFixed(2)} L ${x.toFixed(2)} ${(y + arm).toFixed(2)}" stroke="${state.dotColor}" stroke-width="${strokeWidth.toFixed(2)}" stroke-linecap="square" fill="none" />`
            );
            dotCount += 1;
          }
          rowIndex += 1;
        }

        const svg = [
          `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">`,
          `  ${circles.join("\n  ")}`,
          `</svg>`,
        ].join("\n");

        return { svg, dotCount, width, height };
      }

      function renderSvg() {
        const front = buildLayerSvg("front");
        const back = buildLayerSvg("back");
        state.latestSvgs.front = front.svg;
        state.latestSvgs.back = back.svg;
        state.latestCounts.front = front.dotCount;
        state.latestCounts.back = back.dotCount;
        frontSvgPreview.innerHTML = front.svg.replace("<svg ", `<svg opacity="${state.layerOpacity.front.toFixed(2)}" `);
        backSvgPreview.innerHTML = back.svg.replace("<svg ", `<svg opacity="${state.layerOpacity.back.toFixed(2)}" `);
        invalidateSvgPreview();
        const active = state.activeLayer === "front" ? front : back;
        updateToggleButtons();
        updateLabels();
      }

      function scheduleRender() {
        if (state.pendingRender) {
          return;
        }
        state.pendingRender = true;
        requestAnimationFrame(() => {
          state.pendingRender = false;
          renderSvg();
        });
      }

      function applyCanvasSize() {
        if (state.generatorMode === "image") {
          resizeCanvasPreserveContent(IMAGE_MODE_FRAME_WIDTH, IMAGE_MODE_FRAME_HEIGHT);
          return;
        }
        const width = Math.max(1, Math.min(2400, Number(widthInput.value) || 640));
        const height = Math.max(1, Math.min(2400, Number(heightInput.value) || 640));
        if (width === paintCanvas.width && height === paintCanvas.height) {
          widthInput.value = width;
          heightInput.value = height;
          return;
        }
        resizeCanvasPreserveContent(width, height);
      }

      function clampCanvasSizeValue(value) {
        return Math.max(1, Math.min(2400, Math.round(value)));
      }

      function beginCanvasSizeScrub(axis, event) {
        if (event.button !== 0) {
          return;
        }
        event.preventDefault();
        const input = axis === "width" ? widthInput : heightInput;
        state.sizeScrub = {
          axis,
          startX: event.clientX,
          startValue: clampCanvasSizeValue(Number(input.value) || (axis === "width" ? paintCanvas.width : paintCanvas.height)),
        };
        document.body.classList.add("is-scrubbing-size");
      }

      function updateCanvasSizeScrub(event) {
        if (!state.sizeScrub) {
          return;
        }
        const deltaX = event.clientX - state.sizeScrub.startX;
        const stepSize = event.shiftKey ? 10 : 1;
        const scrubSteps = Math.round(deltaX / 2);
        const nextValue = clampCanvasSizeValue(state.sizeScrub.startValue + scrubSteps * stepSize);
        const input = state.sizeScrub.axis === "width" ? widthInput : heightInput;
        if (Number(input.value) !== nextValue) {
          input.value = String(nextValue);
          scheduleCanvasSizeApply("frame");
        }
      }

      function endCanvasSizeScrub() {
        if (!state.sizeScrub) {
          return;
        }
        state.sizeScrub = null;
        document.body.classList.remove("is-scrubbing-size");
      }

      function cancelScheduledCanvasSizeApply() {
        if (state.resizeDebounceId) {
          if (state.resizeDebounceMode === "timeout") {
            window.clearTimeout(state.resizeDebounceId);
          } else {
            window.cancelAnimationFrame(state.resizeDebounceId);
          }
          state.resizeDebounceId = 0;
          state.resizeDebounceMode = "";
        }
      }

      function scheduleCanvasSizeApply(mode = "frame") {
        cancelScheduledCanvasSizeApply();
        state.resizeDebounceMode = mode;
        if (mode === "timeout") {
          state.resizeDebounceId = window.setTimeout(() => {
            state.resizeDebounceId = 0;
            state.resizeDebounceMode = "";
            applyCanvasSize();
          }, 500);
          return;
        }
        state.resizeDebounceId = window.requestAnimationFrame(() => {
          state.resizeDebounceId = 0;
          state.resizeDebounceMode = "";
          applyCanvasSize();
        });
      }

      async function fitCanvasToReferenceImage() {
        if (!state.referenceImageWidth || !state.referenceImageHeight) {
          return;
        }
        const sameSize =
          state.referenceImageWidth === paintCanvas.width &&
          state.referenceImageHeight === paintCanvas.height;
        if (sameSize) {
          return;
        }
        if (!hasAnyPattern()) {
          resizeCanvasPreserveContent(state.referenceImageWidth, state.referenceImageHeight);
          return;
        }
        const choice = await askImageImportAction(state.referenceImageWidth, state.referenceImageHeight);
        if (choice === "cancel") {
          return;
        }
        if (choice === "delete") {
          resetCanvas(state.referenceImageWidth, state.referenceImageHeight);
          return;
        }
        resizeCanvasPreserveContent(state.referenceImageWidth, state.referenceImageHeight);
      }

      function layerHasPattern(layerName) {
        const layerCanvas = layerCanvases[layerName];
        const layerCtx = layerContexts[layerName];
        const { data } = layerCtx.getImageData(0, 0, layerCanvas.width, layerCanvas.height);
        for (let index = 0; index < data.length; index += 4) {
          if (data[index] !== 255) {
            return true;
          }
        }
        return false;
      }

      function syncLayerContentState(layerNames = ["front", "back"]) {
        for (const layerName of layerNames) {
          state.layerHasContent[layerName] = layerHasPattern(layerName);
        }
      }

      function hasAnyPattern() {
        return state.layerHasContent.front || state.layerHasContent.back;
      }

      function openShortcutDialog() {
        shortcutDialog.hidden = false;
        shortcutDialog.classList.add("visible");
      }

      function closeShortcutDialog() {
        shortcutDialog.hidden = true;
        shortcutDialog.classList.remove("visible");
      }

      function togglePatternSettingsSection() {
        patternSettingsSection.classList.toggle("is-hidden");
      }

      function closeImageImportDialog() {
        imageImportDialog.hidden = true;
        imageImportDialog.classList.remove("visible");
      }

      function closeModeSwitchDialog() {
        modeSwitchDialog.hidden = true;
        modeSwitchDialog.classList.remove("visible");
      }

      function closeLayerDeleteDialog() {
        layerDeleteDialog.hidden = true;
        layerDeleteDialog.classList.remove("visible");
      }

      function hasGeneratorProgress(mode = state.generatorMode) {
        if (mode === "image") {
          return Boolean(state.referenceImageUrl) || state.latestCounts.front > 0;
        }
        return hasAnyPattern() || Boolean(state.referenceImageUrl);
      }

      function resetGeneratorWorkspace(targetMode) {
        const nextWidth =
          targetMode === "image" ? IMAGE_MODE_FRAME_WIDTH : Number(widthInput.defaultValue || 640);
        const nextHeight =
          targetMode === "image" ? IMAGE_MODE_FRAME_HEIGHT : Number(heightInput.defaultValue || 640);

        clearReferenceImage();
        state.activeLayer = "front";
        state.showOverlay = false;
        state.imageTransformVisible = false;
        state.layerVisibility.front = true;
        state.layerVisibility.back = true;
        state.zoom = targetMode === "image" ? IMAGE_MODE_DEFAULT_ZOOM : 1;
        resetCanvas(nextWidth, nextHeight);
        centerViewport();
      }

      function askGeneratorModeChange(nextMode) {
        return new Promise((resolve) => {
          const nextLabel = nextMode === "image" ? "Image Generator" : "Texture Creator";
          modeSwitchDialogMessage.textContent =
            `Switching to ${nextLabel} will delete the current progress. Do you want to continue or cancel?`;

          modeSwitchDialog.hidden = false;
          modeSwitchDialog.classList.add("visible");

          const cleanup = () => {
            closeModeSwitchDialog();
            modeSwitchContinueButton.removeEventListener("click", handleContinue);
            modeSwitchCancelButton.removeEventListener("click", handleCancel);
            modeSwitchDialog.removeEventListener("click", handleBackdrop);
            window.removeEventListener("keydown", handleKeydown);
          };

          const finish = (confirmed) => {
            cleanup();
            resolve(confirmed);
          };

          const handleContinue = () => finish(true);
          const handleCancel = () => finish(false);
          const handleBackdrop = (event) => {
            if (event.target === modeSwitchDialog) {
              finish(false);
            }
          };
          const handleKeydown = (event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              finish(false);
            }
          };

          modeSwitchContinueButton.addEventListener("click", handleContinue);
          modeSwitchCancelButton.addEventListener("click", handleCancel);
          modeSwitchDialog.addEventListener("click", handleBackdrop);
          window.addEventListener("keydown", handleKeydown);
        });
      }

      function askLayerDeleteAction(layerName) {
        return new Promise((resolve) => {
          const layerLabel = layerName === "back" ? "Bottom Layer" : "Top Layer";
          layerDeleteDialogMessage.textContent =
            `This will delete all content in ${layerLabel}. Do you want to continue or cancel?`;

          layerDeleteDialog.hidden = false;
          layerDeleteDialog.classList.add("visible");

          const cleanup = () => {
            closeLayerDeleteDialog();
            layerDeleteConfirmButton.removeEventListener("click", handleConfirm);
            layerDeleteCancelButton.removeEventListener("click", handleCancel);
            layerDeleteDialog.removeEventListener("click", handleBackdrop);
            window.removeEventListener("keydown", handleKeydown);
          };

          const finish = (confirmed) => {
            cleanup();
            resolve(confirmed);
          };

          const handleConfirm = () => finish(true);
          const handleCancel = () => finish(false);
          const handleBackdrop = (event) => {
            if (event.target === layerDeleteDialog) {
              finish(false);
            }
          };
          const handleKeydown = (event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              finish(false);
            }
          };

          layerDeleteConfirmButton.addEventListener("click", handleConfirm);
          layerDeleteCancelButton.addEventListener("click", handleCancel);
          layerDeleteDialog.addEventListener("click", handleBackdrop);
          window.addEventListener("keydown", handleKeydown);
        });
      }

      function askImageImportAction(width, height) {
        return new Promise((resolve) => {
          imageImportDialogMessage.textContent =
            `The new image is ${width} × ${height} px and does not match the current canvas size of ` +
            `${paintCanvas.width} × ${paintCanvas.height} px. You can keep the current pattern, ` +
            `delete it, or cancel the import.`;

          imageImportDialog.hidden = false;
          imageImportDialog.classList.add("visible");

          const cleanup = () => {
            closeImageImportDialog();
            imageImportKeepButton.removeEventListener("click", handleKeep);
            imageImportDeleteButton.removeEventListener("click", handleDelete);
            imageImportCancelButton.removeEventListener("click", handleCancel);
            imageImportDialog.removeEventListener("click", handleBackdrop);
            window.removeEventListener("keydown", handleKeydown);
          };

          const finish = (choice) => {
            cleanup();
            resolve(choice);
          };

          const handleKeep = () => finish("keep");
          const handleDelete = () => finish("delete");
          const handleCancel = () => finish("cancel");
          const handleBackdrop = (event) => {
            if (event.target === imageImportDialog) {
              finish("cancel");
            }
          };
          const handleKeydown = (event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              finish("cancel");
            }
          };

          imageImportKeepButton.addEventListener("click", handleKeep);
          imageImportDeleteButton.addEventListener("click", handleDelete);
          imageImportCancelButton.addEventListener("click", handleCancel);
          imageImportDialog.addEventListener("click", handleBackdrop);
          window.addEventListener("keydown", handleKeydown);
        });
      }

      async function loadReferenceFile(file) {
        if (!file) {
          return;
        }

        const blobUrl = URL.createObjectURL(file);
        const image = new Image();
        image.onload = async () => {
          if (state.generatorMode === "image") {
            setReferenceImage(blobUrl, image.naturalWidth, image.naturalHeight);
            state.referenceImageName = file.name;
            updateLabels();
            scheduleImageGeneration(true);
            return;
          }

          const hasPattern = hasAnyPattern();
          const sameSize =
            image.naturalWidth === paintCanvas.width &&
            image.naturalHeight === paintCanvas.height;

          if (hasPattern && !sameSize) {
            const choice = await askImageImportAction(image.naturalWidth, image.naturalHeight);
            if (choice === "cancel") {
              URL.revokeObjectURL(blobUrl);
              referenceImageInput.value = "";
              return;
            }
          setReferenceImage(blobUrl, image.naturalWidth, image.naturalHeight);
          state.referenceImageName = file.name;
          if (choice === "delete") {
            resetCanvas(image.naturalWidth, image.naturalHeight);
          } else {
            resizeCanvasPreserveContent(image.naturalWidth, image.naturalHeight);
          }
          scheduleImageGeneration(true);
          return;
        }

        setReferenceImage(blobUrl, image.naturalWidth, image.naturalHeight);
        state.referenceImageName = file.name;
        if (!sameSize) {
          resizeCanvasPreserveContent(image.naturalWidth, image.naturalHeight);
        }
        updateLabels();
        scheduleImageGeneration(true);
      };
        image.onerror = () => {
          URL.revokeObjectURL(blobUrl);
        };
        image.src = blobUrl;
      }

      function downloadSvg(svgMarkup, suffix) {
        const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const fileBaseName = sanitizeProjectName(projectNameInput.value || state.projectName);
        link.download = `${fileBaseName}-${suffix}-${layerCanvases.front.width}x${layerCanvases.front.height}.svg`;
        link.click();
        URL.revokeObjectURL(url);
      }

      function clearLayer(layerName) {
        pushHistoryEntry(layerName);
        const layerCtx = layerContexts[layerName];
        layerCtx.fillStyle = "#ffffff";
        layerCtx.fillRect(0, 0, layerCanvases[layerName].width, layerCanvases[layerName].height);
        state.layerHasContent[layerName] = false;
        updateToggleButtons();
        redrawOverlay();
        scheduleRender();
      }

      function clearAllLayers() {
        pushHistoryForLayers(["front", "back"]);
        for (const [layerName, layerCtx] of Object.entries(layerContexts)) {
          layerCtx.fillStyle = "#ffffff";
          layerCtx.fillRect(
            0,
            0,
            layerCanvases[layerName].width,
            layerCanvases[layerName].height
          );
        }
        state.layerHasContent.front = false;
        state.layerHasContent.back = false;
        updateToggleButtons();
        redrawOverlay();
        scheduleRender();
      }

      async function copyLayerSvg(layerName) {
        try {
          await navigator.clipboard.writeText(state.latestSvgs[layerName]);
        } catch (error) {
          window.alert("Could not copy this SVG.");
        }
      }

      function downloadTextFile(contents, filename, type) {
        const blob = new Blob([contents], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
      }

      function normalizeProjectName(value) {
        return value.trim() || "Untitled project";
      }

      function sanitizeProjectName(value) {
        const cleaned = normalizeProjectName(value)
          .trim()
          .replace(/[<>:"/\\|?*\u0000-\u001f]+/g, "-")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");
        return cleaned || "Untitled-project";
      }

      async function getProjectSnapshot() {
        syncCurrentModePatternSettings();
        const referenceImageSource = await resolveReferenceImageSourceForSave();
        return {
          version: 1,
          savedAt: new Date().toISOString(),
          projectName: normalizeProjectName(state.projectName),
          frame: {
            width: paintCanvas.width,
            height: paintCanvas.height,
          },
          document: {
            width: layerCanvases.front.width,
            height: layerCanvases.front.height,
          },
          referenceImage: state.referenceImageUrl
            ? {
                name: state.referenceImageName || "reference-image",
                src: referenceImageSource,
                width: state.referenceImageWidth,
                height: state.referenceImageHeight,
              }
            : null,
          layers: {
            front: layerCanvases.front.toDataURL("image/png"),
            back: layerCanvases.back.toDataURL("image/png"),
          },
          settings: {
            generatorMode: state.generatorMode,
            activeLayer: state.activeLayer,
            mode: state.mode,
            showOverlay: state.showOverlay,
            layerVisibility: { ...state.layerVisibility },
            layerOpacity: { ...state.layerOpacity },
            layerExpanded: { ...state.layerExpanded },
            gridMode: state.gridMode,
            spacing: state.spacing,
            minDot: state.minDot,
            dotScale: state.dotScale,
            strokeWidth: state.strokeWidth,
            strokeTaper: state.strokeTaper,
            sizeCurve: state.sizeCurve,
            sizeCutoff: state.sizeCutoff,
            brushFlow: state.brushFlow,
            flowResponse: state.flowResponse,
            dotColor: state.dotColor,
            zoom: state.zoom,
            referenceImageOpacity: state.referenceImageOpacity,
            toolSettings: {
              paint: { ...state.toolSettings.paint },
              erase: { ...state.toolSettings.erase },
            },
            patternSettingsByMode: {
              texture: { ...state.patternSettingsByMode.texture },
              image: { ...state.patternSettingsByMode.image },
            },
            imageGenerator: { ...state.imageGenerator },
          },
        };
      }

      function blobToDataUrl(blob) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ""));
          reader.onerror = () => reject(new Error("Could not read blob data."));
          reader.readAsDataURL(blob);
        });
      }

      async function resolveReferenceImageSourceForSave() {
        if (!state.referenceImageUrl) {
          return "";
        }
        if (state.referenceImageUrl.startsWith("data:")) {
          return state.referenceImageUrl;
        }
        if (state.referenceImageUrl.startsWith("blob:")) {
          const response = await fetch(state.referenceImageUrl);
          const blob = await response.blob();
          return blobToDataUrl(blob);
        }
        return state.referenceImageUrl;
      }

      async function getImageProjectSnapshot() {
        syncCurrentModePatternSettings();
        const referenceImageSource = await resolveReferenceImageSourceForSave();
        return {
          kind: "kong-image-generator-project",
          version: 1,
          savedAt: new Date().toISOString(),
          projectName: normalizeProjectName(state.projectName),
          frame: {
            width: IMAGE_MODE_FRAME_WIDTH,
            height: IMAGE_MODE_FRAME_HEIGHT,
          },
          referenceImage: state.referenceImageUrl
            ? {
                name: state.referenceImageName || "reference-image",
                src: referenceImageSource,
                width: state.referenceImageWidth,
                height: state.referenceImageHeight,
              }
            : null,
          settings: {
            generatorMode: "image",
            mode: state.mode,
            dotColor: state.dotColor,
            zoom: state.zoom,
            imageGenerator: { ...state.imageGenerator },
            imagePatternSettings: { ...state.patternSettingsByMode.image },
          },
        };
      }

      async function saveProjectFile() {
        state.projectName = normalizeProjectName(projectNameInput.value);
        projectNameInput.value = projectNameInput.value.trim();
        const snapshot = await getProjectSnapshot();
        const fileName = `${sanitizeProjectName(state.projectName)}.json`;
        downloadTextFile(JSON.stringify(snapshot, null, 2), fileName, "application/json;charset=utf-8");
      }

      async function saveImageProjectFile() {
        state.projectName = normalizeProjectName(projectNameInput.value);
        projectNameInput.value = projectNameInput.value.trim();
        const snapshot = await getImageProjectSnapshot();
        const fileName = `${sanitizeProjectName(state.projectName)}-image-project.json`;
        downloadTextFile(JSON.stringify(snapshot, null, 2), fileName, "application/json;charset=utf-8");
      }

      function loadImageToCanvas(canvas, dataUrl) {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => {
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const { data } = imageData;
            for (let index = 0; index < data.length; index += 4) {
              const channel = Math.round((data[index] + data[index + 1] + data[index + 2]) / 3);
              data[index] = channel;
              data[index + 1] = channel;
              data[index + 2] = channel;
              data[index + 3] = 255;
            }
            ctx.putImageData(imageData, 0, 0);
            resolve();
          };
          image.onerror = () => reject(new Error("Could not read layer image."));
          image.src = dataUrl;
        });
      }

      async function applyProjectSnapshot(project) {
        if (!project || project.version !== 1 || !project.frame || !project.document || !project.layers) {
          throw new Error("Unsupported project file.");
        }

        const readNumber = (value, fallback) => {
          const parsed = Number(value);
          return Number.isFinite(parsed) ? parsed : fallback;
        };

        const frameWidth = Math.max(1, Math.min(2400, readNumber(project.frame.width, 640)));
        const frameHeight = Math.max(1, Math.min(2400, readNumber(project.frame.height, 640)));
        const documentWidth = Math.max(frameWidth, readNumber(project.document.width, frameWidth));
        const documentHeight = Math.max(frameHeight, readNumber(project.document.height, frameHeight));

        layerCanvases.front.width = documentWidth;
        layerCanvases.front.height = documentHeight;
        layerCanvases.back.width = documentWidth;
        layerCanvases.back.height = documentHeight;

        for (const ctx of Object.values(layerContexts)) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, documentWidth, documentHeight);
        }

        await Promise.all([
          loadImageToCanvas(layerCanvases.front, project.layers.front),
          loadImageToCanvas(layerCanvases.back, project.layers.back),
        ]);
        syncLayerContentState();

        if (project.referenceImage?.src) {
          setReferenceImage(
            project.referenceImage.src,
            Math.max(1, readNumber(project.referenceImage.width, frameWidth)),
            Math.max(1, readNumber(project.referenceImage.height, frameHeight))
          );
          state.referenceImageName = project.referenceImage.name || "reference-image";
        } else {
          clearReferenceImage();
        }
        updateFrameDimensions(frameWidth, frameHeight);

        const settings = project.settings || {};
        state.projectName = normalizeProjectName(project.projectName || state.projectName);
        state.generatorMode = settings.generatorMode === "image" ? "image" : "texture";
        state.showOverlay = Boolean(settings.showOverlay);
        state.gridMode = settings.gridMode === "staggered" ? "staggered" : "aligned";
        state.spacing = Math.max(4, Math.min(40, readNumber(settings.spacing, state.spacing)));
        state.minDot = Math.max(0, Math.min(4, readNumber(settings.minDot, state.minDot)));
        state.dotScale = Math.max(0.2, Math.min(1.6, readNumber(settings.dotScale, state.dotScale)));
        state.strokeWidth = Math.max(0.2, Math.min(8, readNumber(settings.strokeWidth, state.strokeWidth)));
        state.strokeTaper = Math.max(0, Math.min(1, readNumber(settings.strokeTaper, state.strokeTaper)));
        state.sizeCurve = Math.max(0.5, Math.min(3, readNumber(settings.sizeCurve, state.sizeCurve)));
        state.sizeCutoff = Math.max(0, Math.min(4, readNumber(settings.sizeCutoff, state.sizeCutoff)));
        state.brushFlow = clampBrushFlow(readNumber(settings.brushFlow, state.brushFlow));
        state.flowResponse = clampFlowResponse(readNumber(settings.flowResponse, state.flowResponse));
        state.dotColor = typeof settings.dotColor === "string" ? settings.dotColor : state.dotColor;
        state.zoom = clampZoom(readNumber(settings.zoom, 1));
        state.referenceImageOpacity = Math.max(
          0,
          Math.min(1, readNumber(settings.referenceImageOpacity, state.referenceImageOpacity))
        );
        state.layerVisibility = {
          front: settings.layerVisibility?.front !== false,
          image: settings.layerVisibility?.image === true,
          back: settings.layerVisibility?.back !== false,
        };
        state.layerOpacity = {
          front: Math.max(0, Math.min(1, readNumber(settings.layerOpacity?.front, 1))),
          image: Math.max(0, Math.min(1, readNumber(settings.layerOpacity?.image, state.referenceImageOpacity))),
          back: Math.max(0, Math.min(1, readNumber(settings.layerOpacity?.back, 1))),
        };
        state.layerExpanded = {
          front: settings.layerExpanded?.front === true,
          image: settings.layerExpanded?.image === true,
          back: settings.layerExpanded?.back !== false,
        };
        state.referenceImageOpacity = state.layerOpacity.image;
        state.imageGenerator = {
          brightness: Math.max(-1, Math.min(1, readNumber(settings.imageGenerator?.brightness, state.imageGenerator.brightness))),
          contrast: Math.max(-1, Math.min(1, readNumber(settings.imageGenerator?.contrast, state.imageGenerator.contrast))),
          gamma: clampImageGamma(readNumber(settings.imageGenerator?.gamma, state.imageGenerator.gamma)),
          cutoff: clampImageCutoff(readNumber(settings.imageGenerator?.cutoff, state.imageGenerator.cutoff)),
          density: clampImageDensity(readNumber(settings.imageGenerator?.density, state.imageGenerator.density)),
          imageScale: clampImageScale(readNumber(settings.imageGenerator?.imageScale, state.imageGenerator.imageScale)),
          offsetX: readNumber(settings.imageGenerator?.offsetX, state.imageGenerator.offsetX),
          offsetY: readNumber(settings.imageGenerator?.offsetY, state.imageGenerator.offsetY),
        };
        state.patternSettingsByMode = {
          texture: {
            ...TEXTURE_PATTERN_DEFAULTS,
            ...(settings.patternSettingsByMode?.texture || {}),
          },
          image: {
            ...IMAGE_PATTERN_DEFAULTS,
            ...(settings.patternSettingsByMode?.image || {}),
          },
        };
        state.patternSettingsByMode[state.generatorMode] = {
          spacing: state.spacing,
          minDot: state.minDot,
          dotScale: state.dotScale,
          strokeWidth: state.strokeWidth,
          strokeTaper: state.strokeTaper,
          sizeCurve: state.sizeCurve,
          sizeCutoff: state.sizeCutoff,
          brushFlow: state.brushFlow,
          flowResponse: state.flowResponse,
        };

        const projectToolSettings = settings.toolSettings || {};
        state.toolSettings.paint = {
          size: clampBrushSize(readNumber(projectToolSettings.paint?.size, state.toolSettings.paint.size)),
          hardness: clampBrushHardness(
            readNumber(projectToolSettings.paint?.hardness, state.toolSettings.paint.hardness)
          ),
        };
        state.toolSettings.erase = {
          size: clampBrushSize(readNumber(projectToolSettings.erase?.size, state.toolSettings.erase.size)),
          hardness: clampBrushHardness(
            readNumber(projectToolSettings.erase?.hardness, state.toolSettings.erase.hardness)
          ),
        };

        state.activeLayer = settings.activeLayer === "back" ? "back" : "front";
        state.history = [];
        state.redoHistory = [];
        state.viewOffsetX = 0;
        state.viewOffsetY = 0;

        spacingInput.value = String(Math.round(state.spacing));
        minDotInput.value = String(state.minDot);
        dotScaleInput.value = String(Math.round(state.dotScale * 100));
        strokeWidthInput.value = String(state.strokeWidth);
        strokeTaperInput.value = String(Math.round(state.strokeTaper * 100));
        sizeCurveInput.value = String(Math.round(state.sizeCurve * 100));
        sizeCutoffInput.value = String(Math.round(state.sizeCutoff * 100));
        brushFlowInput.value = String(Math.round(state.brushFlow * 100));
        flowResponseInput.value = String(Math.round(state.flowResponse * 100));
        dotColorInput.value = state.dotColor;
        zoomInput.value = String(Math.round(state.zoom * 100));
        imageOpacityInput.value = String(Math.round(state.referenceImageOpacity * 100));
        projectNameInput.value = state.projectName === "Untitled project" ? "" : state.projectName;
        generatorModeSelect.value = state.generatorMode;

        switchMode(
          settings.mode === "erase"
            ? "erase"
            : settings.mode === "move"
              ? "move"
              : settings.mode === "zoom"
                ? "zoom"
              : "paint"
        );
        setFloatingToolbarVisibility(state.mode === "move" || state.mode === "zoom", true);
        setZoomToolbarVisibility(state.mode !== "zoom", true);
        setGeneratorMode(state.generatorMode);
        updateToggleButtons();
        updateLabels();
        redrawOverlay();
        centerViewport();
        scheduleRender();
      }

      async function applyImageProjectSnapshot(project) {
        if (
          !project ||
          project.kind !== "kong-image-generator-project" ||
          project.version !== 1 ||
          !project.frame ||
          !project.settings
        ) {
          throw new Error("Unsupported image project file.");
        }

        const readNumber = (value, fallback) => {
          const parsed = Number(value);
          return Number.isFinite(parsed) ? parsed : fallback;
        };

        resetGeneratorWorkspace("image");
        state.projectName = normalizeProjectName(project.projectName || state.projectName);
        projectNameInput.value = state.projectName === "Untitled project" ? "" : state.projectName;
        state.dotColor =
          typeof project.settings.dotColor === "string" ? project.settings.dotColor : state.dotColor;
        dotColorInput.value = state.dotColor;

        if (project.referenceImage?.src) {
          setReferenceImage(
            project.referenceImage.src,
            Math.max(1, readNumber(project.referenceImage.width, IMAGE_MODE_FRAME_WIDTH)),
            Math.max(1, readNumber(project.referenceImage.height, IMAGE_MODE_FRAME_HEIGHT))
          );
          state.referenceImageName = project.referenceImage.name || "reference-image";
        } else {
          clearReferenceImage();
        }

        state.imageGenerator = {
          brightness: Math.max(-1, Math.min(1, readNumber(project.settings.imageGenerator?.brightness, state.imageGenerator.brightness))),
          contrast: Math.max(-1, Math.min(1, readNumber(project.settings.imageGenerator?.contrast, state.imageGenerator.contrast))),
          gamma: clampImageGamma(readNumber(project.settings.imageGenerator?.gamma, state.imageGenerator.gamma)),
          cutoff: clampImageCutoff(readNumber(project.settings.imageGenerator?.cutoff, state.imageGenerator.cutoff)),
          density: clampImageDensity(readNumber(project.settings.imageGenerator?.density, state.imageGenerator.density)),
          imageScale: clampImageScale(readNumber(project.settings.imageGenerator?.imageScale, state.imageGenerator.imageScale)),
          offsetX: readNumber(project.settings.imageGenerator?.offsetX, state.imageGenerator.offsetX),
          offsetY: readNumber(project.settings.imageGenerator?.offsetY, state.imageGenerator.offsetY),
        };
        state.patternSettingsByMode.image = {
          ...IMAGE_PATTERN_DEFAULTS,
          ...(project.settings.imagePatternSettings || {}),
        };
        state.zoom = clampZoom(readNumber(project.settings.zoom, IMAGE_MODE_DEFAULT_ZOOM));
        state.imageTransformVisible = Boolean(state.referenceImageUrl);

        setGeneratorMode("image");
        switchMode(
          project.settings.mode === "move"
            ? "move"
            : project.settings.mode === "zoom"
              ? "zoom"
              : "paint"
        );
        updateToggleButtons();
        updateLabels();
        centerViewport();
        updateViewportTransform();
        scheduleImageGeneration(true);
      }

      async function loadProjectFile(file) {
        if (!file) {
          return;
        }

        try {
          const project = JSON.parse(await file.text());
          await applyProjectSnapshot(project);
        } catch (error) {
          window.alert("Could not load this project file.");
        } finally {
          loadProjectInput.value = "";
        }
      }

      async function loadImageProjectFile(file) {
        if (!file) {
          return;
        }

        try {
          const project = JSON.parse(await file.text());
          await applyImageProjectSnapshot(project);
        } catch (error) {
          window.alert("Could not load this image project file.");
        } finally {
          loadImageProjectInput.value = "";
        }
      }

      function activateLayer(layerName) {
        if (layerName !== "front" && layerName !== "back") {
          return;
        }
        state.activeLayer = layerName;
        updateToggleButtons();
        redrawOverlay();
        renderSvg();
      }

      function handleLayerButtonKeydown(event, layerName) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateLayer(layerName);
        }
      }

      frontLayerButton.addEventListener("click", () => {
        activateLayer("front");
      });
      frontLayerButton.addEventListener("keydown", (event) => {
        handleLayerButtonKeydown(event, "front");
      });

      backLayerButton.addEventListener("click", () => {
        activateLayer("back");
      });
      backLayerButton.addEventListener("keydown", (event) => {
        handleLayerButtonKeydown(event, "back");
      });

      frontLayerVisibilityButton.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleLayerVisibility("front");
      });

      imageLayerVisibilityButton.addEventListener("click", (event) => {
        event.stopPropagation();
        if (state.generatorMode === "image") {
          return;
        }
        toggleLayerVisibility("image");
        if (state.generatorMode === "image" && state.layerVisibility.image) {
          scheduleImageGeneration(true);
        }
      });

      backLayerVisibilityButton.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleLayerVisibility("back");
      });

      frontLayerDeleteButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        if (frontLayerDeleteButton.disabled) {
          return;
        }
        const confirmed = await askLayerDeleteAction("front");
        if (!confirmed) {
          return;
        }
        clearLayer("front");
      });

      backLayerDeleteButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        if (backLayerDeleteButton.disabled) {
          return;
        }
        const confirmed = await askLayerDeleteAction("back");
        if (!confirmed) {
          return;
        }
        clearLayer("back");
      });

      paintModeButton.addEventListener("click", () => {
        switchMode("paint");
      });

      eraseModeButton.addEventListener("click", () => {
        switchMode("erase");
      });

      moveModeButton.addEventListener("click", () => {
        switchMode("move");
      });

      zoomModeButton.addEventListener("click", () => {
        switchMode("zoom");
      });

      overlayToggleButton.addEventListener("click", () => {
        state.showOverlay = !state.showOverlay;
        updateToggleButtons();
        updateLabels();
        redrawOverlay();
      });

      overlayToggleVisibleButton.addEventListener("click", () => {
        state.showOverlay = !state.showOverlay;
        updateToggleButtons();
        updateLabels();
        redrawOverlay();
      });

      alignedGridButton.addEventListener("click", () => {
        state.gridMode = "aligned";
        updateToggleButtons();
        scheduleRender();
      });

      staggeredGridButton.addEventListener("click", () => {
        state.gridMode = "staggered";
        updateToggleButtons();
        scheduleRender();
      });

      brushSizeInput.addEventListener("input", () => {
        setBrushSize(Number(brushSizeInput.value));
      });

      brushHardnessInput.addEventListener("input", () => {
        setBrushHardness(Number(brushHardnessInput.value) / 100);
      });

      spacingInput.addEventListener("input", () => {
        state.spacing = Number(spacingInput.value);
        syncCurrentModePatternSettings();
        updateLabels();
        scheduleRender();
      });

      minDotInput.addEventListener("input", () => {
        state.minDot = Number(minDotInput.value);
        syncCurrentModePatternSettings();
        updateLabels();
        scheduleRender();
      });

      dotScaleInput.addEventListener("input", () => {
        state.dotScale = Number(dotScaleInput.value) / 100;
        syncCurrentModePatternSettings();
        updateLabels();
        scheduleRender();
      });

      strokeWidthInput.addEventListener("input", () => {
        state.strokeWidth = Number(strokeWidthInput.value);
        syncCurrentModePatternSettings();
        updateLabels();
        scheduleRender();
      });

      strokeTaperInput.addEventListener("input", () => {
        state.strokeTaper = Number(strokeTaperInput.value) / 100;
        syncCurrentModePatternSettings();
        updateLabels();
        scheduleRender();
      });

      sizeCurveInput.addEventListener("input", () => {
        state.sizeCurve = Number(sizeCurveInput.value) / 100;
        syncCurrentModePatternSettings();
        updateLabels();
        scheduleRender();
      });

      sizeCutoffInput.addEventListener("input", () => {
        state.sizeCutoff = Number(sizeCutoffInput.value) / 100;
        syncCurrentModePatternSettings();
        updateLabels();
        scheduleRender();
      });

      brushFlowInput.addEventListener("input", () => {
        setBrushFlow(Number(brushFlowInput.value) / 100);
        syncCurrentModePatternSettings();
      });

      flowResponseInput.addEventListener("input", () => {
        setFlowResponse(Number(flowResponseInput.value) / 100);
        syncCurrentModePatternSettings();
      });

      dotColorInput.addEventListener("input", () => {
        state.dotColor = dotColorInput.value;
        updateLabels();
        scheduleRender();
      });

      dotColorVisible.addEventListener("input", () => {
        state.dotColor = dotColorVisible.value;
        dotColorInput.value = state.dotColor;
        updateLabels();
        scheduleRender();
      });

      generatorModeSelect.addEventListener("change", async () => {
        const nextMode = generatorModeSelect.value;
        if (nextMode === state.generatorMode) {
          return;
        }
        if (hasGeneratorProgress()) {
          const confirmed = await askGeneratorModeChange(nextMode);
          if (!confirmed) {
            generatorModeSelect.value = state.generatorMode;
            return;
          }
        }
        window.location.href = nextMode === "texture" ? "./index.html" : "./pattern-generator.html";
      });

      imageBrightnessInput.addEventListener("input", () => {
        state.imageGenerator.brightness = Math.max(-1, Math.min(1, Number(imageBrightnessInput.value) / 100));
        updateLabels();
        scheduleImageGeneration();
      });

      imageContrastInput.addEventListener("input", () => {
        state.imageGenerator.contrast = Math.max(-1, Math.min(1, Number(imageContrastInput.value) / 100));
        updateLabels();
        scheduleImageGeneration();
      });

      imageGammaInput.addEventListener("input", () => {
        state.imageGenerator.gamma = clampImageGamma(Number(imageGammaInput.value) / 100);
        updateLabels();
        scheduleImageGeneration();
      });

      imageCutoffInput.addEventListener("input", () => {
        state.imageGenerator.cutoff = clampImageCutoff(Number(imageCutoffInput.value) / 100);
        updateLabels();
        scheduleImageGeneration();
      });

      imageDensityInput.addEventListener("input", () => {
        state.imageGenerator.density = imageDensityFromPercent(Number(imageDensityInput.value));
        updateLabels();
        scheduleImageGeneration();
      });

      imageScaleInput.addEventListener("input", () => {
        state.imageGenerator.imageScale = clampImageScale(Number(imageScaleInput.value) / 100);
        updateLabels();
        scheduleImageGeneration();
      });

      zoomInput.addEventListener("input", () => {
        setZoom(Number(zoomInput.value) / 100);
      });

      zoomHundredButton.addEventListener("click", () => {
        resetView();
      });

      zoomFitButton.addEventListener("click", () => {
        fitZoomToWorkspace();
      });

      zoomOutButton.addEventListener("click", () => {
        setZoom(state.zoom - 0.1);
      });

      zoomInButton.addEventListener("click", () => {
        setZoom(state.zoom + 0.1);
      });

      fitScreenButton.addEventListener("click", resetView);
      undoButton.addEventListener("click", undoLastAction);
      redoButton.addEventListener("click", redoLastAction);
      resizeButton.addEventListener("click", applyCanvasSize);
      chooseImageButton.addEventListener("click", () => {
        referenceImageInput.click();
      });
      replaceImageButton.addEventListener("click", () => {
        referenceImageInput.click();
      });
      referenceImageInput.addEventListener("change", (event) => {
        const [file] = event.target.files || [];
        loadReferenceFile(file);
      });
      imageOpacityInput.addEventListener("input", () => {
        setLayerOpacity("image", Number(imageOpacityInput.value) / 100);
      });
      fitImageButton.addEventListener("click", fitCanvasToReferenceImage);
      clearImageButton.addEventListener("click", clearReferenceImage);
      projectNameInput.addEventListener("input", () => {
        state.projectName = normalizeProjectName(projectNameInput.value);
      });
      widthScrubHandle.addEventListener("pointerdown", (event) => {
        beginCanvasSizeScrub("width", event);
      });
      heightScrubHandle.addEventListener("pointerdown", (event) => {
        beginCanvasSizeScrub("height", event);
      });
      imageHandleNW.addEventListener("pointerdown", (event) => {
        beginImageScale("nw", event);
      });
      imageHandleN.addEventListener("pointerdown", (event) => {
        beginImageScale("n", event);
      });
      imageHandleNE.addEventListener("pointerdown", (event) => {
        beginImageScale("ne", event);
      });
      imageHandleE.addEventListener("pointerdown", (event) => {
        beginImageScale("e", event);
      });
      imageHandleSW.addEventListener("pointerdown", (event) => {
        beginImageScale("sw", event);
      });
      imageHandleS.addEventListener("pointerdown", (event) => {
        beginImageScale("s", event);
      });
      imageHandleSE.addEventListener("pointerdown", (event) => {
        beginImageScale("se", event);
      });
      imageHandleW.addEventListener("pointerdown", (event) => {
        beginImageScale("w", event);
      });
      widthInput.addEventListener("input", cancelScheduledCanvasSizeApply);
      heightInput.addEventListener("input", cancelScheduledCanvasSizeApply);
      widthInput.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          const stepSize = event.shiftKey ? 10 : 1;
          const currentValue = Number(widthInput.value) || 640;
          const delta = event.key === "ArrowUp" ? stepSize : -stepSize;
          const nextValue = Math.max(1, Math.min(2400, currentValue + delta));
          window.requestAnimationFrame(() => {
            widthInput.value = String(nextValue);
            scheduleCanvasSizeApply("frame");
          });
        }
      });
      widthInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          cancelScheduledCanvasSizeApply();
          applyCanvasSize();
        }
      });
      widthInput.addEventListener("blur", () => {
        cancelScheduledCanvasSizeApply();
        applyCanvasSize();
      });
      heightInput.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          const stepSize = event.shiftKey ? 10 : 1;
          const currentValue = Number(heightInput.value) || 640;
          const delta = event.key === "ArrowUp" ? stepSize : -stepSize;
          const nextValue = Math.max(1, Math.min(2400, currentValue + delta));
          window.requestAnimationFrame(() => {
            heightInput.value = String(nextValue);
            scheduleCanvasSizeApply("frame");
          });
        }
      });
      heightInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          cancelScheduledCanvasSizeApply();
          applyCanvasSize();
        }
      });
      heightInput.addEventListener("blur", () => {
        cancelScheduledCanvasSizeApply();
        applyCanvasSize();
      });

      clearButton.addEventListener("click", () => {
        clearLayer(state.activeLayer);
      });

      downloadFrontButton.addEventListener("click", () => {
        if (downloadFrontButton.disabled) {
          return;
        }
        downloadSvg(state.latestSvgs.front, "front");
      });

      downloadBackButton.addEventListener("click", () => {
        if (downloadBackButton.disabled) {
          return;
        }
        downloadSvg(state.latestSvgs.back, "back");
      });

      downloadBothButton.addEventListener("click", () => {
        if (downloadBothButton.disabled) {
          return;
        }
        downloadSvg(state.latestSvgs.front, "front");
        window.setTimeout(() => downloadSvg(state.latestSvgs.back, "back"), 50);
      });

      topCopyButton.addEventListener("click", () => {
        if (topCopyButton.disabled) {
          return;
        }
        copyLayerSvg("front");
      });

      bottomCopyButton.addEventListener("click", () => {
        if (bottomCopyButton.disabled) {
          return;
        }
        copyLayerSvg("back");
      });

      saveProjectButton.addEventListener("click", async () => {
        if (state.generatorMode === "image") {
          try {
            await saveImageProjectFile();
          } catch (error) {
            window.alert("Could not save this image project.");
          }
          return;
        }
        try {
          await saveProjectFile();
        } catch (error) {
          window.alert("Could not save this project.");
        }
      });
      loadProjectVisibleButton.addEventListener("click", () => {
        loadProjectInput.click();
      });
      loadImageProjectVisibleButton.addEventListener("click", () => {
        loadImageProjectInput.click();
      });
      loadProjectButton.addEventListener("click", () => {
        loadProjectInput.click();
      });
      loadProjectInput.addEventListener("change", (event) => {
        const [file] = event.target.files || [];
        loadProjectFile(file);
      });
      loadImageProjectInput.addEventListener("change", (event) => {
        const [file] = event.target.files || [];
        loadImageProjectFile(file);
      });

      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(state.latestSvgs[state.activeLayer]);
          copyButton.textContent = "Copied";
          window.setTimeout(() => {
            copyButton.textContent = "Copy Active SVG";
          }, 1200);
        } catch (error) {
          copyButton.textContent = "Copy Failed";
          window.setTimeout(() => {
            copyButton.textContent = "Copy Active SVG";
          }, 1200);
        }
      });

      shortcutHelpButton.addEventListener("click", openShortcutDialog);
      shortcutDialogCloseButton.addEventListener("click", closeShortcutDialog);
      shortcutDialog.addEventListener("click", (event) => {
        if (event.target === shortcutDialog) {
          closeShortcutDialog();
        }
      });

      document.addEventListener("mouseover", handleTooltipPointerOver);
      document.addEventListener("mouseout", handleTooltipPointerOut);
      document.addEventListener("focusin", handleTooltipFocusIn);
      document.addEventListener("focusout", handleTooltipFocusOut);
      document.addEventListener("pointerdown", hideAppTooltip, true);
      document.addEventListener(
        "pointerdown",
        (event) => {
          if (state.generatorMode !== "image" || !state.referenceImageUrl) {
            return;
          }
          const target = event.target;
          if (!(target instanceof Node)) {
            return;
          }
          if (zoomShell.contains(target)) {
            state.imageTransformVisible = true;
          } else {
            state.imageTransformVisible = false;
          }
          updateImageTransformOverlay();
        },
        true
      );
      window.addEventListener("resize", refreshAppTooltip);
      window.addEventListener("scroll", refreshAppTooltip, true);
      window.addEventListener("blur", hideAppTooltip);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          hideAppTooltip();
        }
      });

      paintCanvas.addEventListener("pointerdown", pointerDown);
      paintCanvas.addEventListener("pointermove", pointerMove);
      paintCanvas.addEventListener("pointerup", pointerUp);
      paintCanvas.addEventListener("pointerleave", handleCanvasPointerLeaveForActions);
      paintCanvas.addEventListener("pointercancel", pointerUp);
      paintCanvas.addEventListener("pointerenter", handleCanvasPointerEnter);
      paintCanvas.addEventListener("pointerleave", handleCanvasPointerLeave);
      paintCanvas.addEventListener("contextmenu", (event) => {
        if (event.altKey) {
          event.preventDefault();
        }
      });
      paintCanvas.addEventListener(
        "wheel",
        (event) => {
          if (!event.metaKey && !event.ctrlKey) {
            return;
          }
          event.preventDefault();
          const zoomStep = event.deltaY < 0 ? 0.1 : -0.1;
          setZoom(state.zoom + zoomStep);
        },
        { passive: false }
      );

      window.addEventListener("pointermove", (event) => {
        updateImageScale(event);
        updateCanvasSizeScrub(event);
      });

      window.addEventListener("pointerup", () => {
        endImageScale();
        endCanvasSizeScrub();
      });

      window.addEventListener("pointercancel", () => {
        endImageScale();
        endCanvasSizeScrub();
      });

      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && shortcutDialog.classList.contains("visible")) {
          event.preventDefault();
          closeShortcutDialog();
          return;
        }
        if (event.target instanceof HTMLTextAreaElement) {
          return;
        }
        if (event.target instanceof HTMLInputElement) {
          const blockedTypes = new Set(["text", "search", "email", "url", "password", "tel"]);
          if (blockedTypes.has(event.target.type)) {
            return;
          }
        }
        if (event.target instanceof HTMLElement && event.target.isContentEditable) {
          return;
        }
        if ((event.metaKey || event.ctrlKey) && !event.shiftKey && event.key.toLowerCase() === "z") {
          event.preventDefault();
          undoLastAction();
          return;
        }
        if (
          !event.metaKey &&
          !event.ctrlKey &&
          !event.altKey &&
          event.shiftKey &&
          event.code === "Digit1"
        ) {
          event.preventDefault();
          fitZoomToWorkspace();
          return;
        }
        if (
          !event.metaKey &&
          !event.ctrlKey &&
          !event.altKey &&
          event.shiftKey &&
          event.code === "Digit0"
        ) {
          event.preventDefault();
          resetView();
          return;
        }
        if (!event.metaKey && !event.ctrlKey && !event.altKey && event.shiftKey && event.key.toLowerCase() === "s") {
          event.preventDefault();
          togglePatternSettingsSection();
          return;
        }
        if (event.code === "Space" && !state.panKeyDown) {
          event.preventDefault();
          state.panKeyDown = true;
          updatePanCursor();
          return;
        }
        if (
          state.generatorMode === "image" &&
          state.referenceImageUrl &&
          state.imageTransformVisible &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.altKey &&
          (event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowDown")
        ) {
          event.preventDefault();
          const step = event.shiftKey ? 10 : 1;
          if (event.key === "ArrowLeft") {
            nudgeReferenceImage(-step, 0);
          } else if (event.key === "ArrowRight") {
            nudgeReferenceImage(step, 0);
          } else if (event.key === "ArrowUp") {
            nudgeReferenceImage(0, -step);
          } else if (event.key === "ArrowDown") {
            nudgeReferenceImage(0, step);
          }
          return;
        }
        if (
          (event.metaKey || event.ctrlKey) &&
          ((event.shiftKey && event.key.toLowerCase() === "z") || event.key.toLowerCase() === "y")
        ) {
          event.preventDefault();
          redoLastAction();
          return;
        }
        if (event.key === "[") {
          event.preventDefault();
          if (event.shiftKey) {
            setBrushHardness(state.brushHardness - 0.02);
          } else {
            setBrushSize(state.brushSize - 2);
          }
          return;
        }
        if (!event.metaKey && !event.ctrlKey && !event.altKey) {
          const lowerKey = event.key.toLowerCase();
          if (lowerKey === "b") {
            event.preventDefault();
            switchMode("paint");
            return;
          }
          if (lowerKey === "e") {
            event.preventDefault();
            switchMode("erase");
            return;
          }
          if (lowerKey === "m") {
            event.preventDefault();
            switchMode("move");
            return;
          }
          if (lowerKey === "z" && !event.shiftKey) {
            event.preventDefault();
            switchMode("zoom");
            return;
          }
        }
        if (event.key.toLowerCase() === "x") {
          event.preventDefault();
          if (state.mode === "paint") {
            switchMode("erase");
          } else if (state.mode === "erase") {
            switchMode("paint");
          } else {
            switchMode(state.lastPaintEraseMode === "paint" ? "erase" : "paint");
          }
          return;
        }
        if (event.key === "]") {
          event.preventDefault();
          if (event.shiftKey) {
            setBrushHardness(state.brushHardness + 0.02);
          } else {
            setBrushSize(state.brushSize + 2);
          }
        }
      });

      window.addEventListener("keyup", (event) => {
        if (event.code === "Space") {
          event.preventDefault();
          state.panKeyDown = false;
          state.panning = false;
          updatePanCursor();
        }
      });

      updateLabels();
      setGeneratorMode(state.generatorMode);
      updateToggleButtons();
      setFloatingToolbarVisibility(state.mode === "move" || state.mode === "zoom", true);
      setZoomToolbarVisibility(state.mode !== "zoom", true);
      updatePanCursor();
      resetCanvas(paintCanvas.width, paintCanvas.height);
      window.requestAnimationFrame(centerViewport);
      hideAppTooltip();
